import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';

class Poop extends React.Component {
  render() {
    return (
      <View>
        <Viro3DObject
          source={require('../res/animated_objects/emoji_poop_anim/emoji_poop_anim.vrx')}
          type='VRX'
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          scale={[0.2, 0.2, 0.2]}
          onClick={() => {
            this.props.removeFromBoard(this.props.id);
            this.props.addToInventory(this.props.item.name, this.props.id);
          }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  position: state.boardReducer.boardPieces[1].position
});

const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poop);
