import React from 'react';
import { Viro3DObject, ViroSound } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';

class Poop extends React.Component {
  constructor() {
    super();
    this.state = {
      sfx: false
    };
  }
  render() {
    console.log(this.state);
    return (
      <View>
        <ViroSound
          paused={!this.state.sfx}
          source={require('../../../assets/turd_effect.mp3')}
          loop={false}
          volume={1.0}
        />
        <Viro3DObject
          source={require('../res/animated_objects/emoji_poop_anim/emoji_poop_anim.vrx')}
          type="VRX"
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          scale={[0.2, 0.2, 0.2]}
          onClick={() => {
            this.setState({
              sfx: true
            });
            console.log(this.state);

            this.props.removeFromBoard(this.props.id);
            this.props.addToInventory(this.props.item.name, this.props.id);
          }}
          animation={{ name: 'rotate', run: true, loop: true }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id))
});

export default connect(
  null,
  mapDispatchToProps
)(Poop);
