import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
class SlideMenu extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
      >
        <View style={{ ...StyleSheet.absoluteFill }}>
          <Image
            source={require('./res/PlaygroundAR.jpg')}
            style={{ flex: 1, height: null, width: null }}
          />
        </View>
        <View style={localStyles.container2}>
          <Image
            source={require('./res/Playground_logo.png')}
            resizeMode="contain"
            style={{ height: '95%', width: '95%' }}
          />
        </View>

        <View style={{ height: height / 2 }}>
          <View style={localStyles.button2}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>P L A Y </Text>
          </View>
          <View style={localStyles.button2}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>L O A D </Text>
          </View>
          <View style={localStyles.button2}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              T U T O R I A L
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SlideMenu;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button2: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
});
