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

export default class YouLoseAR extends React.Component {
  render() {
    return (
      <ViroARScene>
        <ViroARCamera>
          <ViroText
            fontSize={16}
            position={[0, 0, -2]}
            width={20}
            height={5}
            extrusionDepth={8}
            materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
            text="YOU LOST!!!!!"
          />
        </ViroARCamera>
      </ViroARScene>
    );
  }
}
