import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import CryptoJS from 'crypto-js';
import ImageResizer from 'react-native-image-resizer';
import Config from 'react-native-config';

export default class juleswardrobe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      selected: [],
      upload: false,
      uploading: false
    }
  };

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

  render() {
    return (
      this.state.upload ?
      <View style={styles.container}>
        <CameraRollPicker selected={this.state.selected} callback={this.getSelectedImages.bind(this)} />
        { this.state.uploading ?
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large" /> : <Text>Nope</Text>}
        <Button title="Cancel" onPress={() => this.setState({upload: false})} />
        <Button title="Upload selected" onPress={this.imageResize.bind(this)} />
      </View> :
      <View style={styles.container}>
        { this.state.url ? <Image style={{width: 250, height: 250}} source={{uri: this.state.url}} /> : <Text>Hi</Text>}
        <Button title="Upload new images" onPress={() => this.setState({upload: true})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('juleswardrobe', () => juleswardrobe);
