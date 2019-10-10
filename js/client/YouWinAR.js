import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { ViroARScene, ViroARTrackingTargets } from 'react-viro';
import Crown from './components/crown.js';

// var createReactClass = require("create-react-class");
class DisconnectedMainScreenAR extends Component {
  constructor() {
    super();
    this.state = {};
    this.separation = Infinity;
    this.distanceBetween = this.distanceBetween.bind(this);
  }
  componentDidMount() {
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
    return (
      <ViroARScene>
        <View>
          <Text>YOU WIN!</Text>
        </View>
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
  boardPieces: state.boardReducer.boardPieces
});
const MainScreenAR = connect(
  mapStateToProps,
  null
)(DisconnectedMainScreenAR);

export default MainScreenAR;
