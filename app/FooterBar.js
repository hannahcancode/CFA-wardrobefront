import React, { Component } from 'react';
import styles from './styles'
import { FooterTab, Button, Icon, Text } from 'native-base';

  class FooterBar extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      if (this.props.shuffling) {
        this.shuffleText = <Text>Stop Shuffling</Text>
        this.shuffleIcon = "ios-close-outline"
        this.shuffleFunc = this.props.stopShuffle
      } else {
        this.shuffleText = <Text>Shuffle</Text>
        this.shuffleIcon = "shuffle"
        this.shuffleFunc = this.props.startShuffle
      }

      if (this.props.uploading) {
        this.closeText = <Text>Close</Text>
        this.closeIcon = "close"
      } else {
        this.closeText = <Text>Back</Text>
        this.closeIcon = "ios-arrow-back"
      }

      if (this.props.uploaderActive) {
        return (
          <FooterTab>
            <Button onPress={ this.props.toggleUploader } vertical>
              <Icon name={ this.closeIcon } />
              { this.closeText }
            </Button>
            <Button onPress={() => this.props.imageResize("top")} vertical disabled={this.props.disabled}>
              <Icon name="ios-cloud-upload-outline"/>
              <Text>Tops</Text>
            </Button>
            <Button onPress={() => this.props.imageResize("bottom")} vertical disabled={this.props.disabled}>
              <Icon name="ios-cloud-upload-outline"/>
              <Text>Bottoms</Text>
            </Button>
            <Button onPress={() => this.props.imageResize("shoes")} vertical disabled={this.props.disabled}>
              <Icon name="ios-cloud-upload-outline"/>
              <Text>Shoes</Text>
            </Button>
          </FooterTab>
        )
      } else {
        return (
          <FooterTab>
            <Button onPress={this.props.toggleUploader} vertical>
              <Icon name="camera" />
              <Text>Upload</Text>
            </Button>
            <Button onPress={ this.shuffleFunc } vertical>
              <Icon name={ this.shuffleIcon } />
              { this.shuffleText }
            </Button>
          </FooterTab>
        )
      }
    }
  }

export default FooterBar
