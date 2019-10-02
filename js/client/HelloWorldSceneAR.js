import React, { Component } from "react";
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
  ViroAnimations
} from "react-viro";
// var createReactClass = require("create-react-class");
export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      xpos: 0,
      ypos: 0,
      zpos: -1
    };
  }

  render() {
    console.log(this.state.xpos);
    return (
      <ViroARScene
        onTrackingUpdated={() => {
          this.setState({ text: "Hello World!" });
        }}
      >
        <ViroText
          text={this.state.text}
          scale={[0.1, 0.1, 0.1]}
          height={1}
          width={4}
          position={[this.state.xpos, this.state.ypos, this.state.zpos]}
          style={styles.helloWorldTextStyle}
        />

        <ViroAmbientLight color="#aaaaaa" />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />

        <ViroImage
          source={require("./res/grid_bg.jpg")}
          position={[0, -0.5, -2]}
          scale={[0.2, 0.2, 0.2]}
          onDrag={(position, source) => {
            this.setState({
              xpos: position[0],
              ypos: position[1],
              zpos: position[2]
            });
          }}
        />
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

module.exports = HelloWorldSceneAR;
