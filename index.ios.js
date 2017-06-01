import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class juleswardrobe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      num: 0,
      selected: [],
    }
  };

  getSelectedImages() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraRollPicker callback={this.getSelectedImages.bind(this)} />
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
