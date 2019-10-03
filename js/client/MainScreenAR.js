import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
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
  ViroAnimations,
  ViroARTrackingTargets,
  ViroARImageMarker
} from "react-viro";
import { getUserPosition } from "./store";
// var createReactClass = require("create-react-class");
class MainScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      xpos: 0,
      ypos: 0,
      zpos: 0
    };
  }

  render() {
    ViroARTrackingTargets.createTargets({
      "calibrate" : {
        source: require('./res/Calibrate.jpg'),
        orientation: "Up",
        physicalWidth: 0.6
      }
    })
    return (
      <ViroARScene>
        <ViroARImageMarker target={"calibrate"} >
          <ViroText text="Puzzle Loading..." position={[0, 0.25, 0]} />
          <ViroText text="You found me :)" position={[.5, 1, 5]} />
          {/* <ViroAmbientLight color="#aaaaaa" />
            <ViroSpotLight
              innerAngle={5}
              outerAngle={90}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color="#ffffff"
              castsShadow={true}
            /> */}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  position: state.position
});

const mapDispatchToProps = dispatch => ({
  getUserPosition: () => dispatch()
});
// const MainScreenAR = connect(
//   null,
//   null
// )(DisconnectedMainScreenAR);

module.exports = MainScreenAR;
