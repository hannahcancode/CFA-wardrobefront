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

export default class juleswardrobe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      selected: [],
      upload: false,
      uploading: false,
      clothes: [],
    }
  };

  componentDidMount() {
    this.getItems();
    console.log("mounted")
  }

  getSelectedImages(images, current) {
    const num = images.length;
    this.setState({
      num: num,
      selected: images,
    });
  }

  uploadImage(uri) {
    console.log("hi")
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
      this.setState({url: response.secure_url.toString(), upload: false, uploading: false, selected: [] })
      console.log(this.state.url);
      this.postNewURL(this.state.url);
    };

    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }

  imageResize() {
    this.setState({
      uploading: true
    })
    const uri = this.state.selected[0].uri
    console.log("hit imageResize with", uri)
    ImageResizer.createResizedImage(uri, 250, 250, 'JPEG', 80)
      .then((resizeImageUri) => {
        console.log("working...")
        this.uploadImage(resizeImageUri)
      }).catch((err) => {
        console.error(err)
      });
    }

  getItems() {
    fetch('https://juleswardrobe.herokuapp.com/api/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ clothes: responseJson });
        console.log(this.state.clothes)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  postNewURL(newURL) {
    fetch(`https://juleswardrobe.herokuapp.com/api/new?imageUrl=${newURL}`, {
      method: 'POST' })
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
        <CameraRollPicker selected={this.state.selected} callback={this.getSelectedImages.bind(this)} />
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large" />
        <Button title="Cancel" onPress={() => this.setState({upload: false})} />
        <Button title="Upload selected" onPress={this.imageResize.bind(this)} />
      </View> ) }
      else if (this.state.upload && !this.state.uploading) {
        return (
      <View style={styles.container}>
        <CameraRollPicker selected={this.state.selected} callback={this.getSelectedImages.bind(this)} />
        <Button title="Cancel" onPress={() => this.setState({upload: false})} />
        <Button title="Upload selected" onPress={this.imageResize.bind(this)} />
      </View> ) }
      else if (!this.state.upload && !this.state.categorize) {
      return (
      <View style={styles.container}>
        { this.state.clothes.length > 0 ?
        <Carousel style={styles.carousel}
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={width}
          itemWidth={180} autoplay={true} firstItem={1}>
          { this.state.clothes.map((item, key) =>
            <Image key={key} source={{uri: item.imageUrl}} style={styles.clothing} />
          )}
        </Carousel>
        : <Text>Hi</Text> }
        { this.state.clothes.length > 0 ?
        <Carousel style={styles.carousel}
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={width}
          itemWidth={180} autoplay={true} firstItem={1}>
          { this.state.clothes.map((item, key) =>
            <Image key={key} source={{uri: item.imageUrl}} style={styles.clothing} />
          )}
        </Carousel>
        : <Text>Hi</Text> }
        { this.state.clothes.length > 0 ?
        <Carousel style={styles.carousel}
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={width}
          itemWidth={180} autoplay={true} firstItem={1}>
          { this.state.clothes.map((item, key) =>
            <Image key={key} source={{uri: item.imageUrl}} style={styles.clothing} />
          )}
        </Carousel>
        : <Text>Hi</Text> }
        <Button title="Upload new images" onPress={() => this.setState({upload: true})} />
        <Button title="Categorize Images" onPress={() => this.setState({categorize: true})} />
      </View> )} else if (this.state.categorize) {
        return (
      <View>
        <Button title="Categorize Images" onPress={() => this.setState({categorize: false})} />

      </View> )}

  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null,
  },
  clothing: {
    height: 180,
    width: 180,
  }
});

AppRegistry.registerComponent('juleswardrobe', () => juleswardrobe);
