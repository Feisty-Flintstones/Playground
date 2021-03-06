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
  ViroARTrackingTargets,
  ViroARCamera,
  ViroText
} from 'react-viro';
import { loadBoard, removeFromBoard } from './store/boardReducer';
import { addToInventory } from './store/inventoryReducer.js';
import Smiley from './components/smiley';
import Poop from './components/poop';
import Coin from './components/coin';
import Crown from './components/crown.js';
import Key from './components/key';
import Lock from './components/lock';
import { setCalibration } from './store/boardReducer.js';
import YouWinAR from './YouWinAR';
import YouLoseAR from './YouLoseAR';

// var createReactClass = require("create-react-class");
class DisconnectedARPage extends Component {
  constructor() {
    super();
    this.state = {
      updateDistance: false
    };
    this.separation = {};
    this.distanceBetween = this.distanceBetween.bind(this);
    this.distance = this.distance.bind(this);
    this.youWon = this.youWon.bind(this);
  }
  componentDidMount() {
    this.props.loadBoard(this.props.arSceneNavigator.viroAppProps);
    this.props.boardPieces.forEach(element => {
      this.separation[element.itemId] = Infinity;
    });
    let stateDist = !this.state.updateDistance;
    this.interval = setInterval(
      () => this.setState({ updateDistance: stateDist }),
      500
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
      console.log(position);
      this.separation[component.itemId] = this.distance(
        position.position,
        position2
      );
    }
  }
  onCollide() {}
  youWon() {
    this.props.arSceneNavigator.pop();
    this.props.arSceneNavigator.push({ scene: YouWinAR });
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
          console.log(component);
        }}
      >
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
            // this.props.setCalibration(true);
          }}
        />
        {/* <ViroText
          fontSize={10}
          position={[0, 0, 0]}
          width={20}
          height={5}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          text={'hi'}
        /> */}
        {/* <ViroARCamera
            ref={component => {
              if (component) {
                temp = component;
                console.log(temp.props.children.props.position);
              }
            }}
          >
           
          </ViroARCamera> */}
        {/* SPOTLIGHT AND SHADING */}
        {/* <ViroSpotLight
              innerAngle={5}
              outerAngle={25}
              direction={[0, -1, 0]}
              position={[0, 5, 0]}
              color='#e9e9e9'
              castsShadow={true}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={7}
              shadowOpacity={0.7}
            />
            <ViroSpotLight
              innerAngle={5}
              outerAngle={90}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color='#ffffff'
              castsShadow={true}
            />
            */}

        {/* BOARD OBJECTIVES */}
        {/* 
            {this.props.coins === 5 ? this.youWon() : null}
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
              : null} */}
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
  calibration: state.boardReducer.calibration,
  coins: state.inventoryReducer.coins
});

const mapDispatchToProps = dispatch => ({
  loadBoard: id => dispatch(loadBoard(id)),
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id)),
  setCalibration: isCalibrated => dispatch(setCalibration(isCalibrated))
});
const ARPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedARPage);

export default ARPage;
