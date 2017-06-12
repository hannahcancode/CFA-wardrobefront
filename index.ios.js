import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import CryptoJS from 'crypto-js';
import ImageResizer from 'react-native-image-resizer';
import Config from 'react-native-config';
import Carousel from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import { Container, Content, Footer } from 'native-base';


export default class juleswardrobe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      selected: [],
      upload: false,
      uploading: false,
      clothes: [],
      uploadButton: true
    }
  };

  componentDidMount() {
    this.getItems();
    console.log("mounted")
  }

  getSelectedImages(images, current) {
    const num = images.length;
    if (num > 0) {
      this.setState({
        num: num,
        selected: images,
        uploadButton: false
      })
    }
    else {
      this.setState({
        num: num,
        selected: images,
        uploadButton: true
      })
    }
  }

  uploadImage(uri, type) {
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = Config.CLOUDINARY_KEY
    let api_secret = Config.CLOUDINARY_SECRET
    let cloud = 'doe2gejvd'
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'
    console.log("hit imageResize with", uri)

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      const response = JSON.parse(xhr._response);
      this.setState({url: response.secure_url.toString(), uploading: false, selected: [] })
      console.log(this.state.url);
      this.postNewURL(this.state.url, this.state.selectedType);
    };

    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }

  imageResize(type) {
    console.log(type)
    this.setState({
      uploading: true,
      selectedType: type
    })
    const uri = this.state.selected[0].uri
    console.log("hit imageResize with", uri)
    ImageResizer.createResizedImage(uri, 250, 250, 'JPEG', 80)
      .then((resizeImageUri) => {
        console.log("working...")
        this.uploadImage(resizeImageUri, type)
      }).catch((err) => {
        console.error(err)
      });
    }

  getItems() {
    fetch('https://juleswardrobe.herokuapp.com/api/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          clothes: responseJson,
          tops: responseJson.filter(this.isTop),
          bottoms: responseJson.filter(this.isBottom),
          shoes: responseJson.filter(this.isShoes),
          shuffle: false,
        });
        console.log(this.state.tops)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  isTop(item){
  if (item.category === 'top') {
    return true;
    }
  }

  isBottom(item){
  if (item.category === 'bottom') {
    return true;
    }
  }

  isShoes(item){
  if (item.category === 'shoes') {
    return true;
    }
  }

  shuffle() {
    this.setState({
      shuffle: true
    })
    this._carousel1.snapToItem(Math.floor((Math.random() * this.state.tops.length + 1)))
    this._carousel2.snapToItem(Math.floor((Math.random() * this.state.bottoms.length + 1)))
    this._carousel3.snapToItem(Math.floor((Math.random() * this.state.shoes.length + 1)))
    this._carousel1.startAutoplay()
    this._carousel2.startAutoplay()
    this._carousel3.startAutoplay()
  }

  stop() {
    this.setState({
      shuffle: false
    })
    this._carousel1.stopAutoplay()
    this._carousel2.stopAutoplay()
    this._carousel3.stopAutoplay()
  }

  updateTrue(){
    this.setState({upload: true});
    console.log("updateTrue")
  }

  updateFalse(){
    this.setState({upload: false});
    console.log("updateTrue")
  }

  postNewURL(newURL) {
    fetch(`https://juleswardrobe.herokuapp.com/api/new?imageUrl=${newURL}&cat=${this.state.selectedType}`,
      {
        method: 'POST'
      })
      .then(() => this.getItems())
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { height, width } = Dimensions.get('window');
      if (this.state.upload && this.state.uploading) {
        return (
          <View style={styles.container}>
            <CameraRollPicker
              style={styles.cameraRoll}
              maximum={1}
              selectedMarker={
                <Image source={require("./assets/circle-check.png")}
                  style={[styles.marker, {width: 25, height: 25}]}
                 />}
              selected={this.state.selected}
              callback={this.getSelectedImages.bind(this)}
            />
            <ActivityIndicator
              animating={this.state.animating}
              style={[styles.centering, {height: 80}]}
              size="large"
            />
            <Button title="Cancel" onPress={() => this.setState({upload: false})} />
          </View>
        )}

      else if (this.state.upload && !this.state.uploading) {
        return (
          <Container>
            <Content>
              <CameraRollPicker
                style={styles.cameraRoll}
                maximum={1}
                selectedMarker={
                  <Image source={require("./assets/circle-check.png")}
                  style={[styles.marker, {width: 25, height: 25}]}
                />}
                selected={this.state.selected}
                callback={this.getSelectedImages.bind(this)}
              />
            </Content>
            <Footer>
              <FooterBar
                update={this.updateFalse.bind(this)}
                upload={true}
                imageResize={this.imageResize.bind(this)}
                disabled={this.state.uploadButton} />
            </Footer>
          </Container>
        )}

      else if (!this.state.upload && !this.state.categorize) {
        return (
            this.state.clothes.length > 0 ?
              <View style={styles.container}>
                <Carousel style={styles.carousel}
                  ref={(carousel) => { this._carousel1 = carousel; }}
                  sliderWidth={width}
                  itemWidth={180}
                  firstItem={1}
                  autoplayInterval={400}
                  autoplayDelay={0} >
                  { this.state.tops.map((item, key) =>
                    <Image key={key} source={{uri: item.imageUrl}} style={styles.clothing} />
                  )}
                </Carousel>
                <Carousel style={styles.carousel}
                  ref={(carousel) => { this._carousel2 = carousel; }}
                  sliderWidth={width}
                  itemWidth={180}
                  firstItem={1}
                  autoplayInterval={400}
                  autoplayDelay={0} >
                  { this.state.bottoms.map((item, key) =>
                    <Image key={key} source={{uri: item.imageUrl}} style={styles.clothing} />
                  )}
                </Carousel>
                <Carousel style={styles.carousel}
                  ref={(carousel) => { this._carousel3 = carousel; }}
                  sliderWidth={width}
                  itemWidth={180}
                  autoplayInterval={400}
                  firstItem={1}
                  autoplayDelay={0} >
                  { this.state.shoes.map((item, key) =>
                    <Image key={key} source={{uri: item.imageUrl}} style={styles.clothing} />
                  )}
                </Carousel>
                <Footer>
                  <FooterBar style={styles.footer} update={this.updateTrue.bind(this)} upload={false} shuffle={this.shuffle.bind(this)} stopShuffle={this.stop.bind(this)} shuffling={this.state.shuffle}/>
                </Footer>
              </View>
            :
              <View style={styles.container}>
                <FooterBar style={styles.footer} update={this.updateTrue.bind(this)} />
              </View>
          )}
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  carousel: {
    height: null,
    width: null,
  },
  clothing: {
    height: 180,
    width: 180,
  },
  footer: {
    maxHeight: 80,
    flex: -1,
    alignSelf: 'flex-end'
  },
  cameraRoll: {
    flex: 3,
  },
  marker: {
  position: 'absolute',
  top: 5,
  right: 5,
  backgroundColor: 'transparent',
  },
});

AppRegistry.registerComponent('juleswardrobe', () => juleswardrobe);
