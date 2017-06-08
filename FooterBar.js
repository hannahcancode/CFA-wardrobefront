import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
  import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
  import CameraRollPicker from 'react-native-camera-roll-picker';

  class FooterBar extends Component {
    constructor(props) {
      super(props);
    }
      render() {
        console.log("props", this.props.update)
                if (this.props.upload) {
                  return (

                  <FooterTab>
                  <Button onPress={this.props.update} vertical>
                      <Icon name="ios-arrow-back" />
                      <Text>Back</Text>
                  </Button>
                  <Button onPress={() => this.props.imageResize("tops")} vertical disabled={this.props.disabled}>
                      <Icon name="ios-cloud-upload-outline" />
                      <Text>Tops</Text>
                  </Button>
                  <Button onPress={() => this.props.imageResize("bottoms")} vertical disabled={this.props.disabled}>
                      <Icon name="ios-cloud-upload-outline" />
                      <Text>Bottoms</Text>
                  </Button>
                  <Button onPress={() => this.props.imageResize("shoes")} vertical disabled={this.props.disabled}>
                      <Icon name="ios-cloud-upload-outline" />
                      <Text>Shoes</Text>
                  </Button>
                </FooterTab>)
            } else if (this.props.shuffling === false) {
              return (
                <FooterTab>
                  <Button onPress={this.props.update} vertical>
                      <Icon name="camera" />
                      <Text>Upload</Text>
                  </Button>
                  <Button onPress={this.props.shuffle} vertical>
                      <Icon name="shuffle" />
                      <Text>Shuffle</Text>
                  </Button>
                </FooterTab> )}
              else {
                return(
                  <FooterTab>
                  <Button onPress={this.props.update} vertical>
                      <Icon name="camera" />
                      <Text>Upload</Text>
                  </Button>
                  <Button onPress={this.props.stopShuffle} vertical>
                      <Icon name="ios-close-outline" />
                      <Text>Stop Shuffle</Text>
                  </Button>
              </FooterTab> )}

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
      alignItems: 'stretch',
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

    }});

  export default FooterBar
