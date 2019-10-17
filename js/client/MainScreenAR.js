/* eslint-disable complexity */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
// import store from "./store/index";
import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroImage,
  ViroNode,
  ViroSound,
  ViroText,
  ViroFlexView
} from 'react-viro';
import {
  loadBoard,
  removeFromBoard,
  moveBoardPiece
} from './store/boardReducer';
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
      updateDistance: false,
      calibrated: false
    };
    this.separation = {};
    this.distanceBetween = this.distanceBetween.bind(this);
    this.distance = this.distance.bind(this);
    this.youWon = this.youWon.bind(this);
    this.worldOriginRef = undefined;
    this.handleOrigin = this.handleOrigin.bind(this);
    this.youLose = this.youLose.bind(this);
    this.getCameraPos = this.getCameraPos.bind(this);
  }
  componentDidMount() {
    this.props.loadBoard(this.props.arSceneNavigator.viroAppProps);
    this.props.boardPieces.forEach(element => {
      this.separation[element.itemId] = Infinity;
    });
    let stateDist = !this.state.updateDistance;
    this.interval = setInterval(
      () => this.setState({ updateDistance: stateDist }),
      300
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
  async getCameraPos() {
    const {
      position,
      forward
    } = await this.arSceneRef.getCameraOrientationAsync();

    let newpos = [
      position[0] + forward[0],
      position[1] + forward[1] * 1.1,
      position[2] + forward[2] * 1.1
    ];
    return [newpos[0] * 10, newpos[1] * 10, newpos[2] * 10];
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
            {!this.props.calibration ? (
              <View>
                <ViroImage
                  position={[0, 0, 0]}
                  rotation={[-90, 0, 0]}
                  onClick={() => {
                    this.handleOrigin();
                    this.props.setCalibration(true);
                    this.setState({
                      calibrated: true
                    });
                  }}
                  scale={[0.07, 0.07, 0.07]}
                  height={1}
                  width={2}
                  source={require('./res/start.png')}
                />
                <ViroSound
                  paused={this.state.calibrated}
                  source={require('../../assets/ready.mp3')}
                  loop={false}
                  volume={1.0}
                />
              </View>
            ) : (
              <View>
                <ViroImage
                  position={[0, 0, 0]}
                  rotation={[-90, 0, 0]}
                  scale={[0.07, 0.07, 0.07]}
                  height={1}
                  width={2}
                  source={require('./res/go.png')}
                />
                <ViroSound
                  paused={!this.state.calibrated}
                  source={require('../../assets/go.mp3')}
                  loop={false}
                  volume={1.0}
                />
              </View>
            )}

            {/* BOARD OBJECTIVES */}
            {this.props.timeUp ? this.youLose() : null}
            {this.props.coins === 5 ? this.youWon() : null}
            <ViroNode rotation={[-90, 0, 0]}>
              {this.props.boardPieces
                ? this.props.boardPieces.map(piece => {
                    if (piece.collected === false && this.worldOriginRef) {
                      if (piece.xpos === null) {
                        this.getCameraPos().then(position => {
                          this.props.moveBoardPiece(piece.itemId, position);
                        });
                      } else {
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
                    }
                  })
                : null}
            </ViroNode>
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
  setCalibration: isCalibrated => dispatch(setCalibration(isCalibrated)),
  moveBoardPiece: (id, position) => dispatch(moveBoardPiece(id, position))
});
const MainScreenAR = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedMainScreenAR);

export default MainScreenAR;
