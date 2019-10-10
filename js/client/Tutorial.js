import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
// import store from "./store/index";
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARImageMarker,
  ViroARTrackingTargets
} from 'react-viro';
import {loadBoard, removeFromBoard, addToBoard} from './store/boardReducer'
import { addToInventory, removeFromInventory } from './store/inventoryReducer.js';

class Tutorial extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'Initializing AR...',
            calibrated: true,
            updateDistance: false,
            update: false
        };
        this.separation = Infinity;
        this.distanceBetween = this.distanceBetween.bind(this);
    }
    componentDidMount() {
        if(this.props.arSceneNavigator.viroAppProps === 0) this.props.loadBoard(0)
        let stateDist = !this.state.updateDistance;
        this.interval = setInterval(
          () => this.setState({ updateDistance: stateDist }),
          1000
        );
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
      distance(position1, position2) {
        let sumSquares = 0;
        for (let i = 0; i <= 2; i++) {
          sumSquares += Math.abs((position1[i] - position2[i]) ** 2);
        }
        return Math.sqrt(sumSquares);
      }
    
      async distanceBetween(component) {
        let xpos = component.xpos;
        let ypos = component.ypos;
        let zpos = component.zpos;
        let position2 = [xpos/10, ypos/10, zpos/10]
        if (this.arSceneRef && position2) {
          const position = await this.arSceneRef.getCameraOrientationAsync();
          this.separation = this.distance(position.position, position2);
        }
      }


}

export default connect (null, null)(Tutorial);