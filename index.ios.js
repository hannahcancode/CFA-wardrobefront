import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class juleswardrobe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CameraRollPicker />
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
