import React from 'react';
import { Viro3DObject, ViroAnimations } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addCoins } from '../store/inventoryReducer.js';
class Coin extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }
  render() {
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
          type='VRX'
          position={this.props.position}
          highAccuracyEvents={true}
          scale={[0.0005, 0.0005, 0.0005]}
          onClick={() => {
            this.props.addCoins();
            this.setState({
              visible: false
            });
          }}
          animation={{ name: 'rotate', run: true, loop: true }}
          visible={this.state.visible}
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
