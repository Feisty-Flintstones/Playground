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
import { setUserPosition } from './store/index.js';
import Smiley from './components/smiley';
import Poop from './components/poop';
import {loadBoard} from './store/boardReducer'

class MapOne extends React.Component {
    constructor() {
        super();
        this.state = {
          text: 'Initializing AR...',
          calibrated: true,
          updateDistance: false,
          update: false
        };
        this.separation = Infinity;
        this.distanceBetween = this.distanceBetween.bind(this);
      }
      componentDidMount() {
        this.props.loadBoard(1);
        let stateDist = !this.state.updateDistance;
        this.interval = setInterval(
          () => this.setState({ updateDistance: stateDist }),
          1000
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
        let position2 = component.position;
        if (this.arSceneRef) {
          const position = await this.arSceneRef.getCameraOrientationAsync();
          this.separation = this.distance(position.position, position2);
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
            <ViroARImageMarker target='calibrate' pauseUpdates={this.state.update}>
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
                    this.setState({
                      update: true
                    });
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
                {this.props.boardPieces.map(piece => {
                  if (piece.collected === false) {
                    this.distanceBetween(piece);
                    switch (piece.name) {
                      case 'Smiley':
                        return (
                          <Smiley
                            key={piece.id}
                            item={piece}
                            visible={this.separation <= 2}
                          />
                        );
                      case 'Poop':
                        return (
                          <Poop
                            key={piece.id}
                            item={piece}
                            visible={this.separation <= 2}
                          />
                        );
                      default:
                        return null;
                    }
                  }
                })}
              </View>
            </ViroARImageMarker>
          </ViroARScene>
        );
      }
}

const mapState = state => {
    return {
        boardPieces: state.boardReducer.boardPieces
    }
}
const mapDispatch = dispatch => {
    return {
        loadBoard: id => dispatch(loadBoard(id))
    }
}
export default connect(mapState, mapDispatch)(MapOne)