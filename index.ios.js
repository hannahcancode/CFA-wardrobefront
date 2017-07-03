import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './app/state_management/reducer'
import initialState from './app/state_management/initialstate'
import App from './app/App'

const store = createStore(reducers, initialState)

class juleswardrobe extends Component {
  render () {
    return (
      <Provider store={ store }>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('juleswardrobe', () => juleswardrobe);
