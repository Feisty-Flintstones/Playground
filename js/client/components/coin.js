import React from 'react';
import { Viro3DObject, ViroAnimations, ViroSound } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addCoins } from '../store/inventoryReducer.js';
class Coin extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      coinSound: false
    };
  }
  render() {
    console.log(this.state);
    ViroAnimations.registerAnimations({
      rotate: {
        properties: {
          rotateY: '+=90'
        },
        duration: 250 //.25 seconds
      }
    });
    return (
      <View>
        <Viro3DObject
          source={require('../res/animated_objects/coin/coin.vrx')}
          type="VRX"
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          scale={[0.0005, 0.0005, 0.0005]}
          onClick={() => {
            this.props.addCoins();
            console.log(this.state);
            this.setState({
              visible: false,
              coinSound: true
            });
          }}
          animation={{ name: 'rotate', run: true, loop: true }}
          visible={this.state.visible && this.props.visible}
        />
        <ViroSound
          paused={!this.state.coinSound}
          // muted={this.state.coinSound}
          source={require('../../../assets/ring_sound_effect.mp3')}
          loop={false}
          volume={1.0}

          // onError={this.onErrorSound}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCoins: () => dispatch(addCoins())
});

export default connect(
  null,
  mapDispatchToProps
)(Coin);
