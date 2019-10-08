import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { StyleSheet, View, Alert} from 'react-native';
// import store from "./store/index";
import {ViroSphere,
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
import Smiley from './smiley'
import Testing from './second'

// var createReactClass = require("create-react-class");
class DisconnectedMainScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      text: 'Initializing AR...',
      calibrated: true,
      updateDistance: false
    };
    this.separation = Infinity;
    this.distanceBetween = this.distanceBetween.bind(this)
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ updateDistance: !this.state.updateDistance}), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  distance(position1, position2) {
    let sumSquares = 0;
    for (let i = 0; i<=2; i++) {
      sumSquares+=Math.abs((position1[i]-position2[i])**2)
    }
    return Math.sqrt(sumSquares);
  }

  async distanceBetween(component) {
    let position2 = component.position;
    if (this.arSceneRef) {
      const position = await this.arSceneRef.getCameraOrientationAsync();
      this.separation = this.distance(position.position, position2)
    }
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
      <ViroARScene
      ref = {(component) => {
        this.arSceneRef = component
      }}
        onTrackingUpdated={() => {
          this.setState({ text: 'Hello World!' });
        }}
      >
        {/* {this.props.calibration ? ( */}
          <View>
            <ViroAmbientLight color="#aaaaaa" />
            <ViroSpotLight
              innerAngle={5}
              outerAngle={90}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color="#ffffff"
              castsShadow={true}
            />
            {this.props.boardPieces.map(piece => {
              if (piece.view === true) {
                this.distanceBetween(piece)
                if (this.separation < 2) {
                switch (piece.name) {
                  case ('Smiley'):
                    return <Smiley key = {piece.id} id={piece.id}/>
                  case ('Testing'):
                    return <Testing key = {piece.id} id = {piece.id}/>
                  default: return null
                }
              }
              }
            })}
            {/* {console.log(this.props.position)}
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
            /> */}
          </View>
        {/* ) : (
          // <Calibrate /> // */}
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

const mapStateToProps = state => ({
  position: state.userReducer.position,
  calibration: state.boardReducer.calibration,
  boardPieces: state.boardReducer.boardPieces
});

const mapDispatchToProps = dispatch => ({
  setUserPos: position => dispatch(setUserPosition(position))
});
const MainScreenAR = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedMainScreenAR);

export default MainScreenAR;
