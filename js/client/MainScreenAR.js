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
  ViroAnimations
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
  componentDidMount() {
    // getUserPosition();
    // let x = this.state.position[0];
    // let y = this.state.position[1];
    // let z = this.state.position[2];
    // this.setState({
    //   xpos: this.state.position[0],
    //   ypos: this.state.position[1],
    //   zpos: this.state.position[2]
    // });
  }
  render() {
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
          position={[0, 0, -1]}
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
            // this.setState({
            //   xpos: position[0],
            //   ypos: position[1],
            //   zpos: position[2]
            // });
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
