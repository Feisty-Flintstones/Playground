/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import store from './js/client/store';
import { Provider } from 'react-redux';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,

  TouchableHighlight,
  ImageBackground
} from 'react-native';
import apiKEY from './my_API_KEY';
import { ViroVRSceneNavigator, ViroARSceneNavigator } from 'react-viro';
import InitialARScene from './js/client/MainScreenAR';

/*
 TODO: Insert your API key below
 */
let sharedProps = apiKEY;

// Sets the default scene you want for AR and VR

// let InitialARScene = require('./js/client/MainScreenAR');
let InitialVRScene = require('./js/client/HelloWorldScene');

let UNSET = 'UNSET';
let VR_NAVIGATOR_TYPE = 'VR';
let AR_NAVIGATOR_TYPE = 'AR';

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
let defaultNavigatorType = UNSET;

class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    // if (this.state.navigatorType == UNSET) {
    //   return this._getExperienceSelector();
    // } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
    //   return this._getVRNavigator();
    // } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {

    //****This IF statement declares which VIEW to display**** */
    if (this.state.navigatorType == UNSET) {
      return this.homeScreen();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this.renderGameAR();
    }
  }

  //Renders the home screen
  homeScreen = () => {
    return (
      <ImageBackground
        source={require('./assets/white-wallpaper.jpg')}
        style={localStyles.container}
      >
        <View style={localStyles.overlayContainer}>
          <View style={localStyles.top}>
            <TouchableHighlight
              onPress={() => this.selectScreen(AR_NAVIGATOR_TYPE)}
            >
              <Text style={localStyles.header}>P L A Y</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  };
  //Renders the game in AR mode
  renderGameAR = () => {
    return <Provider store={store}>{this._getARNavigator()}</Provider>;
  };

  //sets the navigatorType on state. Pass the scene as an argument
  selectScreen = navigatorType => {
    this.setState({
      navigatorType: navigatorType
    });
  };
  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

let localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(52,52,52, .4)'
  },
  top: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    color: '#fff',
    fontSize: 28,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255, .1)'
  }
});

export default App;
