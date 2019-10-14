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
import { loadBoard, removeFromBoard, addToBoard } from './store/boardReducer';
import {
  addToInventory,
  removeFromInventory
} from './store/inventoryReducer.js';
import Smiley from './components/smiley';
import Poop from './components/poop';
import Coin from './components/coin';
import Crown from './components/crown.js';
import { setCalibration } from './store/boardReducer.js';

// var createReactClass = require("create-react-class");
class DisconnectedMainScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      updateDistance: false
    };
    this.separation = {};
    this.distanceBetween = this.distanceBetween.bind(this);
    this.distance = this.distance.bind(this);
  }
  componentDidMount() {
    if (this.props.arSceneNavigator.viroAppProps === 1) this.props.loadBoard(1);
    this.props.boardPieces.forEach(element => {
      this.separation[element.itemId] = Infinity;
    });
    let stateDist = !this.state.updateDistance;
    this.interval = setInterval(
      () => this.setState({ updateDistance: stateDist }),
      100
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
    let position2 = [xpos / 10, ypos / 10, zpos / 10];
    if (this.arSceneRef && position2) {
      const position = await this.arSceneRef.getCameraOrientationAsync();
      this.separation[component.itemId] = this.distance(
        position.position,
        position2
      );
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
        ref={component => {
          this.arSceneRef = component;
        }}
      >
        <ViroARImageMarker
          target='calibrate'
          pauseUpdates={this.props.calibration}
        >
          <View>
            <ViroAmbientLight color='#aaaaaa' />
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
              onClick={() => {
                this.props.setCalibration(true);
              }}
            />
            <ViroSpotLight
              innerAngle={5}
              outerAngle={90}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color='#ffffff'
              castsShadow={true}
            />

            {this.props.boardPieces
              ? this.props.boardPieces.map(piece => {
                  if (piece.collected === false) {
                    this.distanceBetween(piece);
                    switch (piece.name) {
                      case 'Smiley':
                        return (
                          <Smiley
                            key={piece.itemId}
                            item={piece}
                            visible={this.separation[piece.itemId] <= 2.5}
                            xpos={piece.xpos / 10}
                            ypos={piece.ypos / 10}
                            zpos={piece.zpos / 10}
                            id={piece.itemId}
                          />
                        );
                      case 'Poop':
                        return (
                          <Poop
                            key={piece.itemId}
                            item={piece}
                            visible={this.separation[piece.itemId] <= 2.5}
                            xpos={piece.xpos / 10}
                            ypos={piece.ypos / 10}
                            zpos={piece.zpos / 10}
                            id={piece.itemId}
                          />
                        );
                      case 'Coin':
                        return (
                          <Coin
                            key={piece.itemId}
                            item={piece}
                            visible={this.separation[piece.itemId] <= 3}
                            xpos={piece.xpos / 10}
                            ypos={piece.ypos / 10}
                            zpos={piece.zpos / 10}
                            id={piece.itemId}
                          />
                        );
                      default:
                        return null;
                    }
                  }
                })
              : null}
          </View>
        </ViroARImageMarker>
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
  boardPieces: state.boardReducer.boardPieces,
  calibration: state.boardReducer.calibration
});

const mapDispatchToProps = dispatch => ({
  loadBoard: id => dispatch(loadBoard(id)),
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id)),
  setCalibration: isCalibrated => dispatch(setCalibration(isCalibrated))
});
const MainScreenAR = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedMainScreenAR);

export default MainScreenAR;
