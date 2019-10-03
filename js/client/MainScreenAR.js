import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { StyleSheet } from "react-native";
// import store from "./store/index";
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
import { setUserPosition } from "./store/index.js";

// var createReactClass = require("create-react-class");
class DisconnectedMainScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR..."
    };
  }
  componentDidMount() {
    // this.props.getUserPos();
    // console.log(this.props.position);
    // let y = this.state.position[1];
    // let z = this.state.position[2];
    // this.setState({
    //   xpos: this.props.position[0],
    //   ypos: this.props.position[1],
    //   zpos: this.props.position[2]
    // });
  }
  render() {
    // let x = this.props.position[0];
    return (
      <ViroARScene
        onTrackingUpdated={() => {
          this.setState({ text: "Hello World!" });
        }}
      >
        <ViroText
          text={this.state.text}
          scale={[0.2, 0.2, 0.2]}
          height={1}
          width={4}
          position={[
            this.props.position[0],
            this.props.position[1],
            this.props.position[2]
          ]}
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
          position={[0, -0.5, -1]}
          scale={[0.2, 0.2, 0.2]}
          onDrag={(position, source) => {
            this.props.setUserPos(position);
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
  setUserPos: position => dispatch(setUserPosition(position))
});
const MainScreenAR = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedMainScreenAR);

export default MainScreenAR;
