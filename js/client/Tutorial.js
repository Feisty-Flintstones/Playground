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
  ViroImage,
  ViroNode,
  ViroSound,
  ViroPortal,
  ViroPortalScene,
  Viro360Video
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
      calibrated: false,
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
          position={[0, -1, -3]}
          scale={[0.3, 0.3, 0.3]}
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
            text="Find the TOTEM above and hover your"
          />
          <ViroText
            style={styles.prodTitleText}
            width={6}
            height={0.5}
            flexWrap="wrap"
            padding={0.2}
            textAlign="center"
            text="device over it to START game!"
          />
          <ViroText
            style={styles.prodTitleText}
            width={6}
            height={0.5}
            flexWrap="wrap"
            padding={0.2}
            textAlign="center"
            text="(CLICK hint to hide)"
          />
        </ViroFlexView>

        <ViroImage
          position={[0, 0, -2]}
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
          {/* <MapMarker position={[0, 0.2, 0]} /> */}
          <ViroImage
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            onClick={() => {
              this.setState({ calibrated: true });
              this.props.setCalibration(true);
            }}
            scale={[0.04, 0.04, 0.04]}
            height={1}
            width={2}
            source={require('./res/start.png')}
          />

          <ViroSound
            paused={!this.state.calibrated}
            source={require('../../assets/Splash_Tech.mp3')}
            loop={false}
            volume={0.6}
          />
          <ViroSound
            paused={!this.state.calibrated}
            source={require('../../assets/ready.mp3')}
            loop={false}
            volume={1.0}
          />
          <ViroAmbientLight color="#aaaaaa" />
          <ViroFlexView
            transformBehaviors={['billboard']}
            style={styles.titleContainerGood}
            position={[0, -1, -0.9]}
            scale={[0.5, 0.5, 0.5]}
            height={3}
            alignItems="center"
            justifyContent="center"
            onClick={() => this.setState({ secondBB: false })}
            visible={this.state.secondBB}
          >
            <ViroText
              style={styles.prodTitleText}
              width={2}
              height={0}
              flexWrap="wrap"
              padding={0.2}
              textAlign="center"
              text="Click START!"
            />
          </ViroFlexView>

          <ViroFlexView
            transformBehaviors={['billboard']}
            style={styles.titleContainerGood}
            position={[0, 0, -0.9]}
            scale={[0.5, 0.5, 0.5]}
            height={3}
            alignItems="center"
            justifyContent="center"
            onClick={() => this.setState({ secondBB: false })}
            visible={true}
          >
            <ViroText
              style={styles.prodTitleText}
              width={2}
              height={0}
              flexWrap="wrap"
              padding={0.2}
              textAlign="center"
              text="Find all"
            />
            <ViroText
              style={styles.prodTitleText}
              width={2}
              height={0}
              flexWrap="wrap"
              padding={0.2}
              textAlign="center"
              text="the coins!"
            />
          </ViroFlexView>
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
          <ViroNode rotation={[-90, 0, 0]}>
            <Coin xpos={1} ypos={0} zpos={0} visible={true} />
            <Coin xpos={2} ypos={0.4} zpos={0} visible={true} />
            <Coin xpos={3} ypos={-1} zpos={-1} visible={true} />
            <Coin xpos={3} ypos={0} zpos={-0} visible={true} />
            <Coin xpos={2} ypos={0.5} zpos={-1} visible={true} />
          </ViroNode>

          {this.props.coins === 5 ? (
            <ViroNode rotation={[-90, 0, 0]}>
              <ViroAmbientLight color="#ffffff" intensity={200} />
              <ViroPortalScene
                passable={true}
                dragType="FixedDistance"
                onDrag={() => {}}
              >
                <ViroPortal
                  position={[3.8, 0, 0]}
                  scale={[0.15, 0.15, 0.2]}
                  rotation={[0, -90, 0]}
                >
                  <Viro3DObject
                    source={require('./res/animated_objects/portals/portal_ship/portal_ship.vrx')}
                    resources={[
                      require('./res/animated_objects/portals/portal_ship/portal_ship_diffuse.png'),
                      require('./res/animated_objects/portals/portal_ship/portal_ship_normal.png'),
                      require('./res/animated_objects/portals/portal_ship/portal_ship_specular.png')
                    ]}
                    type="VRX"
                  />
                </ViroPortal>
                <Viro360Video
                  source={require('./res/animated_objects/portals/360_surf.mp4')}
                  loop={true}
                />
              </ViroPortalScene>

              <ViroFlexView
                transformBehaviors={['billboard']}
                style={styles.titleContainerGood}
                position={[2.7, 0, -0.8]}
                scale={[0.13, 0.13, 0.13]}
                rotation={[0, 90, 0]}
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
                  text="You're ready to play!"
                />
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="(Click MENU then EXIT)"
                />
                <ViroText
                  style={styles.prodTitleText}
                  width={6}
                  height={0.5}
                  flexWrap="wrap"
                  padding={0.2}
                  textAlign="center"
                  text="Or step into the portal!"
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
            </ViroNode>
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
