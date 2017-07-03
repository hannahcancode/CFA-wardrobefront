// react native, redux
import React, { Component } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux'

// env
import Config from 'react-native-config';

// actions
import {
  dispatchGetSelectedImages,
  dispatchToggleShuffle,
  dispatchToggleUploader,
  dispatchUploadImage,
  dispatchFinishUploading,
  dispatchFetchedClothes
} from './state_management/actions'

// utils
import CryptoJS from 'crypto-js';
import ImageResizer from 'react-native-image-resizer';

// ui
import CameraRollPicker from 'react-native-camera-roll-picker';
import Carousel from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import { Footer } from 'native-base';

// styles
import styles from './styles'

class App extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // grabs clothes from API
    this.getItems();
  }

  getItems() {
    fetch(Config.WARDROBE_API)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.dispatch(dispatchFetchedClothes(
          {
            path: ['clothes'],
            array: responseJson
          }))
        this.props.dispatch(dispatchFetchedClothes(
          {
            path: ['tops'],
            array: responseJson.filter((item) => this.categorize(item, 'top'))
          }))
        this.props.dispatch(dispatchFetchedClothes(
          {
            path: ['bottoms'],
            array: responseJson.filter((item) => this.categorize(item, 'bottom'))
          }))
        this.props.dispatch(dispatchFetchedClothes(
          {
            path: ['shoes'],
            array: responseJson.filter((item) => this.categorize(item, 'shoes'))
          }))
        console.log(this.props.state)
      })
      .catch((error) => {
        // TODO: need to create component for error getting clothes
        console.error(error);
      });
  }

  getSelectedImages(selected) {
    this.props.dispatch(dispatchGetSelectedImages(selected))
    console.log("NEW STATE: ", this.props.state)
  }

  uploadImage(uri) {
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = Config.CLOUDINARY_KEY
    let api_secret = Config.CLOUDINARY_SECRET
    let cloud = 'doe2gejvd'
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);

    fetch(upload_url, {
      method: 'post',
      body: formdata
    })
      .then((response) => response.json())
      .then((json) => json.secure_url.toString())
      .then((url) => {
        this.postNewURL(url)
        this.props.dispatch(dispatchFinishUploading(url))
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  imageResize(type) {
    console.log(type)
    this.props.dispatch(dispatchUploadImage(type))
    const uri = this.props.state.selected[0].uri
    console.log("hit imageResize with", uri)
    ImageResizer.createResizedImage(uri, 250, 250, 'JPEG', 80)
      .then((resizeImageUri) => {
        console.log("working...")
        this.uploadImage(resizeImageUri, type)
      }).catch((err) => {
      console.error(err)
    });
  }

  categorize(item, category){
    console.log(item, category)
    if (item.category === category) {
      return true;
    }
  }

  shuffle() {
    this.props.dispatch(dispatchToggleShuffle())
    this._carousel1.snapToItem(Math.floor((Math.random() * this.props.state.tops.length + 1)))
    this._carousel2.snapToItem(Math.floor((Math.random() * this.props.state.bottoms.length + 1)))
    this._carousel3.snapToItem(Math.floor((Math.random() * this.props.state.shoes.length + 1)))
    this._carousel1.startAutoplay()
    this._carousel2.startAutoplay()
    this._carousel3.startAutoplay()
  }

  stop() {
    this.props.dispatch(dispatchToggleShuffle())
    this._carousel1.stopAutoplay()
    this._carousel2.stopAutoplay()
    this._carousel3.stopAutoplay()
  }

  postNewURL(secure_url) {
    console.log("POST_NEW_URL", secure_url, this.props.state.selectedType)
    fetch(`${Config.WARDROBE_API}new?imageUrl=${secure_url}&cat=${this.props.state.selectedType}`,
      {
        method: 'POST'
      })
      .then(() => this.getItems())
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { width } = Dimensions.get('window');

    if (this.props.state.uploaderActive) {
      return (
        <View
          style={styles.container}
        >
          <CameraRollPicker
            style={styles.cameraRoll}
            maximum={1}
            selectedMarker={
              <Image
                source={require("./assets/circle-check.png")}
                style={[styles.marker, {width: 25, height: 25}]}
              />
            }
            selected={this.props.state.selected}
            callback={this.getSelectedImages.bind(this)}
          />
          {this.props.state.uploading &&
            <ActivityIndicator
              animating={true}
              style={[
                {height: 80}
                ]}
              size="large"
            />
          }
          <Footer>
            <FooterBar
              toggleUploader={() => this.props.dispatch(dispatchToggleUploader())}
              uploaderActive={true}
              uploading={this.props.state.uploading}
              imageResize={this.imageResize.bind(this)}
              disabled={this.props.state.uploadButton}
            />
          </Footer>
        </View>
      )}

    else if (!this.props.state.uploaderActive) {
      return (
        this.props.state.clothes.length > 0 ?
          <View
            style={styles.container}
          >
            <Carousel
              style={styles.carousel}
              ref={(carousel) => { this._carousel1 = carousel; }}
              sliderWidth={width}
              itemWidth={180}
              firstItem={1}
              autoplayInterval={400}
              autoplayDelay={0}
            >
              {this.props.state.tops.map((item, key) =>
                <Image
                  key={key}
                  source={{uri: item.imageUrl}}
                  style={styles.clothing}
                />
              )}
            </Carousel>
            <Carousel
              style={styles.carousel}
              ref={(carousel) => { this._carousel2 = carousel; }}
              sliderWidth={width}
              itemWidth={180}
              firstItem={1}
              autoplayInterval={400}
              autoplayDelay={0}
            >
              { this.props.state.bottoms.map((item, key) =>
                <Image
                  key={key}
                  source={{uri: item.imageUrl}}
                  style={styles.clothing}
                />
              )}
            </Carousel>
            <Carousel
              style={styles.carousel}
              ref={(carousel) => { this._carousel3 = carousel; }}
              sliderWidth={width}
              itemWidth={180}
              autoplayInterval={400}
              firstItem={1}
              autoplayDelay={0}
            >
              { this.props.state.shoes.map((item, key) =>
                <Image
                  key={key}
                  source={{uri: item.imageUrl}}
                  style={styles.clothing}
                />
              )}
            </Carousel>
            <Footer>
              <FooterBar
                style={styles.footer}
                uploaderActive={false}
                startShuffle={this.shuffle.bind(this)}
                stopShuffle={this.stop.bind(this)}
                shuffling={this.props.state.shuffling}
                toggleUploader={() => this.props.dispatch(dispatchToggleUploader())}
              />
            </Footer>
          </View>
          :
          <View style={styles.container}>
            <FooterBar
              style={styles.footer}
              toggleUploader={() => this.props.dispatch(dispatchToggleUploader())}
              noclothes={true}
            />
          </View>
      )}
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(App)

