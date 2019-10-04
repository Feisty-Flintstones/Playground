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
  ViroNode,
  ViroImage,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroOrbitCamera
} from 'react-viro';
import { setUserPosition } from './store/index.js';
import { setCalibration } from './store/boardReducer';
import { thisExpression } from '@babel/types';

class DisconnectedCalibrate extends Component {
  render() {
    ViroARTrackingTargets.createTargets({
      calibrate: {
        source: require('./res/tottem.jpg'),
        orientation: 'Up',
        physicalWidth: 0.1
      }
    });
    return (
      <ViroARImageMarker target="calibrate">
        <ViroAmbientLight color="#FFFFFF" />

        <Viro3DObject
          source={require('./res/animated_objects/object_star_anim/object_star_anim.vrx')}
          resources={[
            require('./res/animated_objects/object_star_anim/object_star_diffuse.png'),
            require('./res/animated_objects/object_star_anim/object_star_specular.png')
          ]}
          type="VRX"
          position={[0, 0, 0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[90, 0, 0]}
          onClick={(position, source) => {
            this.props.setUserPos(position);
            this.props.setCalibration(true);
          }}
        />
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
