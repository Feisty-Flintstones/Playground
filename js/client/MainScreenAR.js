import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
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
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimations
} from "react-viro";
import { setUserPosition } from "./store/index.js";
import Calibrate from "./calibrate.js";

// var createReactClass = require("create-react-class");
class DisconnectedMainScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      calibrated: true
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
    ViroARTrackingTargets.createTargets({
      calibrate: {
        source: require("./res/tottem.jpg"),
        orientation: "Up",
        physicalWidth: 0.1
      }
    });
    return (
      <ViroARScene
        onTrackingUpdated={() => {
          this.setState({ text: "Hello World!" });
        }}
      >
        {this.props.calibration ? (
          <View>
            {console.log(this.props.position)}
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
            <Viro3DObject
              source={require("./res/animated_objects/emoji_smile/emoji_smile.vrx")}
              type="VRX"
              position={[
                this.props.position[0],
                this.props.position[1],
                this.props.position[2]
              ]}
              scale={[0.2, 0.2, 0.2]}
              onDrag={(position, source) => {
                this.props.setUserPos(position);
              }}
            />
          </View>
        ) : (
          <Calibrate />
        )}
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
  position: state.userReducer.position,
  calibration: state.boardReducer.calibration
});

const mapDispatchToProps = dispatch => ({
  setUserPos: position => dispatch(setUserPosition(position))
});
const MainScreenAR = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedMainScreenAR);

export default MainScreenAR;
