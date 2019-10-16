import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
// import store from "./store/index";
import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroImage,
  ViroAmbientLight
} from 'react-viro';
import { loadBoard, removeFromBoard } from './store/boardReducer';
import { addToInventory } from './store/inventoryReducer.js';
import Smiley from './components/smiley';
import Coin from './components/coin';
import Crown from './components/crown.js';
import Key from './components/key';
import Lock from './components/lock';
import Heart from './components/heart';
import Star from './components/star';
import { setCalibration } from './store/boardReducer.js';
import YouWinAR from './YouWinAR';
import YouLoseAR from './YouLoseAR';

class DisconnectedMainScreenAR extends Component {
  constructor() {
    super();
    this.state = {
      updateDistance: false
    };
    this.separation = {};
    this.distanceBetween = this.distanceBetween.bind(this);
    this.distance = this.distance.bind(this);
    this.youWon = this.youWon.bind(this);
    this.worldOriginRef = undefined;
    this.handleOrigin = this.handleOrigin.bind(this);
    this.youLose = this.youLose.bind(this);
  }
  componentDidMount() {
    this.props.loadBoard(this.props.arSceneNavigator.viroAppProps);
    this.props.boardPieces.forEach(element => {
      this.separation[element.itemId] = Infinity;
    });
    let stateDist = !this.state.updateDistance;
    this.interval = setInterval(
      () => this.setState({ updateDistance: stateDist }),
      200
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
    if (!this.worldOriginRef) return;
    let xpos = component.xpos / 10 + this.worldOriginRef[0];
    let ypos = component.ypos / 10 + this.worldOriginRef[1];
    let zpos = component.zpos / 10 + this.worldOriginRef[2];
    let position2 = [xpos, ypos, zpos];
    if (this.arSceneRef && position2) {
      const position = await this.arSceneRef.getCameraOrientationAsync();
      this.separation[component.itemId] = this.distance(
        position.position,
        position2
      );
    }
  }

  youWon() {
    this.props.arSceneNavigator.pop();
    this.props.arSceneNavigator.push({ scene: YouWinAR });
  }

  youLose() {
    this.props.arSceneNavigator.pop();
    this.props.arSceneNavigator.push({ scene: YouLoseAR });
  }

  async handleOrigin() {
    const { position } = await this.arSceneRef.getCameraOrientationAsync();
    this.worldOriginRef = position;
  }
  render() {
    ViroARTrackingTargets.createTargets({
      calibrate: {
        // source: require('./res/test.jpg'),
        source: require('./res/tottem.jpg'),
        orientation: 'Up',
        physicalWidth: 0.1651
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
            {/* START */}
          <ViroImage
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            onClick={() => {
              this.handleOrigin() 
              this.props.setCalibration(true);
            }
            }
            scale={[0.04, 0.04, 0.04]}
            height={1}
            width={2}
            source={require('./res/start.png')}
            />

            {/* BOARD OBJECTIVES */}
            {this.props.timeUp ? this.youLose() : null}
            {this.props.coins === 5 ? this.youWon() : null}
            {this.props.boardPieces
              ? this.props.boardPieces.map(piece => {
                  if (piece.collected === false && this.worldOriginRef) {
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
                      case 'Star':
                        return (
                          <Star
                            key={piece.itemId}
                            item={piece}
                            visible={this.separation[piece.itemId] <= 2.5}
                            xpos={piece.xpos / 10}
                            ypos={piece.ypos / 10}
                            zpos={piece.zpos / 10}
                            id={piece.itemId}
                          />
                        );
                      case 'Crown':
                          return (
                            <Crown
                              key={piece.itemId}
                              item={piece}
                              visible={this.separation[piece.itemId] <= 2.5}
                              xpos={piece.xpos / 10}
                              ypos={piece.ypos / 10}
                              zpos={piece.zpos / 10}
                              id={piece.itemId}
                            />
                          );
                      case 'Heart':
                          return (
                            <Heart
                              key={piece.itemId}
                              item={piece}
                              visible={this.separation[piece.itemId] <= 2.5}
                              xpos={piece.xpos / 10}
                              ypos={piece.ypos / 10}
                              zpos={piece.zpos / 10}
                              id={piece.itemId}
                            />
                          );
                      case 'Key':
                        return (
                          <Key
                            key={piece.itemId}
                            item={piece}
                            visible={this.separation[piece.itemId] <= 2.5}
                            xpos={piece.xpos / 10}
                            ypos={piece.ypos / 10}
                            zpos={piece.zpos / 10}
                            id={piece.itemId}
                          />
                        );
                      case 'Lock':
                        return (
                          <Lock
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
                            visible={this.separation[piece.itemId] <= 2.5}
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
  calibration: state.boardReducer.calibration,
  coins: state.inventoryReducer.coins,
  timeUp: state.timeReducer.timeUp
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
