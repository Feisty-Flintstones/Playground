import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroText,
  ViroMaterials,
  ViroARCamera
} from 'react-viro';
import Crown from './components/crown.js';
import Fireworks from './components/Fireworks';

class YouLose extends Component {
  render() {
    return (
      <ViroARScene>
        <ViroARCamera>
          <ViroText
            fontSize={16}
            style={styles2.boldFont}
            position={[0, 0, -2]}
            width={20}
            height={5}
            extrusionDepth={8}
            materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
            text='YOU LOSE!!'
          />
        </ViroARCamera>
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
let styles2 = StyleSheet.create({
  boldFont: {
    color: '#FFFFFF',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: '#FFFFFF'
  },
  backMaterial: {
    diffuseColor: '#FF0000'
  },
  sideMaterial: {
    diffuseColor: '#0000FF'
  }
});
const mapStateToProps = state => ({
  boardPieces: state.boardReducer.boardPieces
});
export default connect(
  mapStateToProps,
  null
)(YouLose);
