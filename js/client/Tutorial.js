import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
// import store from "./store/index";
import { setCalibration } from './store/boardReducer.js';
import MapMarker from './components/mapMarker';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroFlexView,
  ViroText,
  ViroARCamera,
  ViroImage
} from 'react-viro';
import { loadBoard, removeFromBoard, addToBoard } from './store/boardReducer';
import {
  addToInventory,
  removeFromInventory
} from './store/inventoryReducer.js';
import Coin from './components/coin';
import Smiley from './components/smiley';

class Tutorial extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'Initializing AR...',
      calibrated: true,
      updateDistance: false,
      update: false,
      firstBB: true,
      secondBB: true,
      thirdBB: true,
      fourthBB: true,
      totem: true
    };
    this.separation = Infinity;
    this.distanceBetween = this.distanceBetween.bind(this);
  }
  componentDidMount() {
    // if (this.props.arSceneNavigator.viroAppProps === 0) this.props.loadBoard(0);
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

  //  async getCamPos (){
  //    return (
  //      [await this.arSceneRef.getCameraOrientationAsync()]
  //    )
  //  }

  async distanceBetween(component) {
    let xpos = component.xpos;
    let ypos = component.ypos;
    let zpos = component.zpos;
    let position2 = [xpos / 10, ypos / 10, zpos / 10];
    if (this.arSceneRef && position2) {
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
        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, 0]}
          position={[0, 5, 0]}
          color="#e9e9e9"
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
          color="#ffffff"
          castsShadow={true}
        />
        <ViroFlexView
          transformBehaviors={['billboard']}
          style={styles.titleContainerGood}
          position={[0, 0, -7]}
          scale={[0.5, 0.5, 0.5]}
          height={2.5}
          width={6}
          alignItems="center"
          justifyContent="center"
          onClick={() => this.setState({ firstBB: false })}
          visible={this.state.firstBB}
        >
          <ViroText
            style={styles.prodTitleText}
            width={6}
            height={0.5}
            flexWrap="wrap"
            padding={0.2}
            textAlign="center"
            text="Find your TOTEM to start game!"
          />
          <ViroText
            style={styles.prodTitleText}
            width={6}
            height={0.5}
            flexWrap="wrap"
            padding={0.2}
            textAlign="center"
            text="Hover your device over TOTEM to calibrate"
          />
        </ViroFlexView>

        <ViroImage
          position={[0, 0.6, -2]}
          scale={[0.25, 0.25, 0.25]}
          height={2}
          width={2}
          source={require('./res/tottem.jpg')}
          visible={this.state.firstBB}
        />

        {/* Step# 2 */}

        <ViroARImageMarker
          target="calibrate"
          pauseUpdates={this.props.calibration}
        >
          <MapMarker position={[0, 0.2, 0]} />
          <ViroImage
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            onClick={() => {
              this.props.setCalibration(true);
            }}
            scale={[0.04, 0.04, 0.04]}
            height={1}
            width={2}
            source={require('./res/start.png')}
          />

          <View>
            <ViroAmbientLight color="#aaaaaa" />
            <ViroFlexView
              transformBehaviors={['billboard']}
              style={styles.titleContainerGood}
              position={[0, -0.9, -5]}
              scale={[0.5, 0.5, 0.5]}
              height={2.5}
              width={6}
              alignItems="center"
              justifyContent="center"
              onClick={() => this.setState({ secondBB: false })}
              visible={this.state.secondBB}
            >
              <ViroText
                style={styles.prodTitleText}
                width={6}
                height={0.5}
                flexWrap="wrap"
                padding={0.2}
                textAlign="center"
                text="Look around for COINS! Click to collect!"
              />
            </ViroFlexView>
          </View>
          {/* Step # 3 */}
          {/* <View>
            <ViroFlexView
              transformBehaviors={['billboard']}
              style={styles.titleContainerGood}
              position={[0, 0, 5]}
              rotation={[180, 180, 180]}
              scale={[0.75, 0.75, 0.75]}
              height={2.5}
              width={6}
              alignItems="center"
              justifyContent="center"
              onClick={() => this.setState({ thirdBB: false })}
              visible={this.state.thirdBB}
            >
              <ViroText
                style={styles.prodTitleText}
                width={6}
                height={0.5}
                flexWrap="wrap"
                position={[0, 0.5, 0]}
                padding={0.2}
                textAlign="center"
                text="Keep walking this way until you see it..."
              />
            </ViroFlexView>
          </View> */}
          <Smiley xpos={-5} ypos={0} zpos={1} visible={true} />

          <Coin xpos={0} ypos={0} zpos={3} visible={true} />
          <Coin xpos={-1} ypos={0} zpos={3} visible={true} />
          <Coin xpos={-2} ypos={0} zpos={3} visible={true} />
          <Coin xpos={-3} ypos={0} zpos={3} visible={true} />
          <Coin xpos={-4} ypos={0} zpos={3} visible={true} />
          {this.props.coins === 5 ? (
            <ViroARCamera>
              <ViroFlexView
                transformBehaviors={['billboard']}
                style={styles.titleContainerGood}
                position={[0, 0, -7]}
                scale={[0.5, 0.5, 0.5]}
                height={2.5}
                width={6}
                alignItems="center"
                justifyContent="center"
                onClick={() => this.setState({ thirdBB: false })}
                visible={this.state.thirdBB}
              >
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="You got all the coins!"
                />
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="You can also collect items and"
                />
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="store it in your inventory list."
                />
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="Look for the smiley and click to add it."
                />
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="Click it from your inventory to discard."
                />

                {/* <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="Click to dismiss hint"
                /> */}
              </ViroFlexView>
            </ViroARCamera>
          ) : null}

          {/* <ViroText
            style={styles.prodTitleText}
            width={6}
            height={0.5}
            flexWrap="wrap"
            position={[0, 0, 5]}
            padding={0.2}
            textAlign="center"
            text="Items are hidden until you're close to them!"
            visible={this.state.fourthBB}
          /> */}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
let styles = StyleSheet.create({
  titleContainerGood: {
    // flexDirection: 'row',
    backgroundColor: '#90EE90'
    // padding: 0.2,
    // paddingRight: 0
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#333333',
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingRight: 0,
    width: 5,
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({
  boardPieces: state.boardReducer.boardPieces,
  calibration: state.boardReducer.calibration,
  coins: state.inventoryReducer.coins
});

const mapDispatchToProps = dispatch => ({
  loadBoard: id => dispatch(loadBoard(id)),
  setCalibration: isCalibrated => dispatch(setCalibration(isCalibrated))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
