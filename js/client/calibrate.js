import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroNode,
  ViroImage,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroOrbitCamera
} from 'react-viro';
import { setUserPosition } from './store/index.js';
import { setCalibration } from './store/boardReducer';
import { thisExpression } from '@babel/types';
import Smiley from './smiley';
import Heart from './heart';

class DisconnectedCalibrate extends Component {
  constructor() {
    super();
    this.state = {
      update: false
    };
  }
  render() {
    ViroARTrackingTargets.createTargets({
      calibrate: {
        source: require('./res/tottem.jpg'),
        orientation: 'Up',
        physicalWidth: 0.1
      }
    });
    return (
      <ViroARImageMarker target='calibrate' pauseUpdates={this.state.update}>
        <ViroAmbientLight color='#FFFFFF' />

        <Viro3DObject
          source={require('./res/animated_objects/object_star_anim/object_star_anim.vrx')}
          resources={[
            require('./res/animated_objects/object_star_anim/object_star_diffuse.png'),
            require('./res/animated_objects/object_star_anim/object_star_specular.png')
          ]}
          type='VRX'
          position={[0, 0, 0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[90, 0, 0]}
          // onHover={(isHovering, position, source) => {
          //   this.props.setUserPos(position);
          //   this.props.setCalibration(true);
          // }}
          onClick={() => {
            this.setState({
              update: true
            });
          }}
        />
        <Viro3DObject
          source={require('./res/animated_objects/object_star_anim/object_star_anim.vrx')}
          resources={[
            require('./res/animated_objects/object_star_anim/object_star_diffuse.png'),
            require('./res/animated_objects/object_star_anim/object_star_specular.png')
          ]}
          type='VRX'
          position={[-3, 1, 10]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, 0, 0]}
          // onHover={(isHovering, position, source) => {
          //   this.props.setUserPos(position);
          //   this.props.setCalibration(true);
          // }}
          onClick={() => {
            this.setState({
              update: true
            });
          }}
        />
        {/* </ViroARPlaneSelector> */}
        <Heart id={1} name='Heart' />
        <Smiley id={0} name='Smiley' />
      </ViroARImageMarker>
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

const mapStateToProps = state => ({
  position: state.userReducer.position,
  calibration: state.boardReducer.calibration
});

const mapDispatchToProps = dispatch => ({
  setUserPos: position => dispatch(setUserPosition(position)),
  setCalibration: calibration => dispatch(setCalibration(calibration))
});
const Calibrate = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedCalibrate);

export default Calibrate;
