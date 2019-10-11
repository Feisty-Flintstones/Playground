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
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Image
} from 'react-native';
import sharedProps from './my_API_KEY';
import { ViroARSceneNavigator } from 'react-viro';
import InitialARScene from './js/client/MainScreenAR';
import Inventory from './js/client/Inventory';
import CoinCounter from './js/client/CoinCounter';
import Tutorial from './js/client/Tutorial';

let UNSET = 'UNSET';
let PLAY = 'AR';
let LOAD = 'LOAD';
let TUTORIAL = 'TUTORIAL';

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
let defaultNavigatorType = UNSET;

//Styles
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
  overlayContainer1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .85)'
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
    backgroundColor: 'rgba(255,255,255, .1)',
    marginVertical: 8,
    textAlign: 'center'
  },
  menu: {
    width: '70%'
  },
  menu1: {
    alignItems: 'center'
  },
  selections: {
    alignItems: 'center'
  }
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      boardSelect: 0
    };
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getTutorialARNavigator = this._getTutorialARNavigator.bind(this);

    this._getInventorySlot = this._getInventorySlot.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    //****This IF statement declares which VIEW to display**** */
    if (this.state.navigatorType === UNSET) {
      return this.homeScreen();
    } else if (this.state.navigatorType === LOAD) {
      return this.loadScreen();
    } else if (this.state.navigatorType === PLAY) {
      return this.renderGameAR();
    } else if (this.state.navigatorType === TUTORIAL) {
      return this.renderTutorialAR();
    }
    // else if (this.state.navigatorType === MAP_ONE) {
    //   return this.renderMapOne();
    // }
  }

  //Renders the home screen
  homeScreen = () => {
    return (
      <ImageBackground
        source={require('./assets/white-wallpaper.jpg')}
        style={localStyles.container}
      >
        <View style={localStyles.overlayContainer}>
          <View style={localStyles.top} activeOpacity={0.5}>
            {/* <Text style={localStyles.header}>L O G O here</Text> */}
            <Image
              source={require('./js/client/res/Main.png')}
              style={localStyles.container}
            />
          </View>
          <View style={localStyles.selections}>
            <View style={localStyles.menu} activeOpacity={0.5}>
              <TouchableHighlight onPress={() => this.selectScreen(PLAY)}>
                <Text style={localStyles.header}>P L A Y</Text>
              </TouchableHighlight>
            </View>
            <View style={localStyles.menu} activeOpacity={0.5}>
              <TouchableHighlight onPress={() => this.selectScreen(LOAD)}>
                <Text style={localStyles.header}>L O A D</Text>
              </TouchableHighlight>
            </View>
            <View style={localStyles.menu} activeOpacity={0.5}>
              <TouchableHighlight
                onPress={() => this.selectScreen(TUTORIAL, 0)}
              >
                <Text style={localStyles.header}>T U T O R I A L</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
  //Renders the load screen
  //currently holds dummy data.
  loadScreen = () => {
    return (
      <ImageBackground
        source={require('./assets/white-wallpaper.jpg')}
        style={localStyles.container}
      >
        <View style={localStyles.overlayContainer1}>
          <View style={localStyles.top} activeOpacity={0.5}>
            {/* <Text style={localStyles.header}>L O G O here</Text> */}
            <Image
              source={require('./js/client/res/Main.png')}
              style={localStyles.container}
            />
          </View>
          <View style={localStyles.menu1} activeOpacity={0.5}>
            <TouchableHighlight
              onPress={() => {
                this.selectScreen(PLAY, 1);
              }}
            >
              <Text style={localStyles.header}>
                M A P #1
                <Image
                  source={require('./js/client/res/inventory_icons/pixel_smiley.png')}
                  style={{ width: 50, height: 50 }}
                />
              </Text>
            </TouchableHighlight>
          </View>
          {/* <View style={localStyles.menu1} activeOpacity={0.5}>
            <TouchableHighlight onPress={() => this.selectScreen(UNSET)}>
              <Text style={localStyles.header}>
                M A P #2
                <Image
                  source={require('./js/client/res/inventory_icons/pixel_heart.png')}
                  style={{ width: 50, height: 50 }}
                />
              </Text>
            </TouchableHighlight>
          </View>
          <View style={localStyles.menu1} activeOpacity={0.5}>
            <TouchableHighlight onPress={() => this.selectScreen(UNSET)}>
              <Text style={localStyles.header}>
                M A P #3
                <Image
                  source={require('./js/client/res/inventory_icons/pixel_turd.png')}
                  style={{ width: 50, height: 50 }}
                />
              </Text>
            </TouchableHighlight>
          </View> */}
        </View>
      </ImageBackground>
    );
  };

  //Sets the navigatorType on state. Pass the scene as an argument
  selectScreen = (navigatorType, boardNum) => {
    if (boardNum) {
      this.setState({
        navigatorType: navigatorType,
        boardSelect: boardNum
      });
    } else {
      this.setState({
        navigatorType: navigatorType
      });
    }
  };

  //Create REDUX Store
  renderGameAR = () => {
    return (
      <Provider store={store}>
        {this._getInventorySlot()}
        {this._getCoinCounter()}
        {this._getARNavigator()}
      </Provider>
    );
  };

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        viroAppProps={this.state.boardSelect}
        onExitViro={this._exitViro}
        autofocus={true}
      />
    );
  }

  renderTutorialAR = () => {
    return (
      <Provider store={store}>
        {this._getCoinCounter()}
        {this._getTutorialARNavigator()}
      </Provider>
    );
  };

  _getTutorialARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: Tutorial }}
        viroAppProps={this.state.boardSelect}
        onExitViro={this._exitViro}
        autofocus={true}
      />
    );
  }

  // //Inventory React Native Component
  _getInventorySlot() {
    return <Inventory onExitViro={this._exitViro} />;
  }
  //Coin Counter React Native Component
  _getCoinCounter() {
    return <CoinCounter />;
  }
  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

export default App;
