import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addInventory, getInventory } from '../store/inventoryReducer.js';
class Heart extends React.Component {
  render() {
    return (
      <View>
        <Viro3DObject
          source={require('../res/animated_objects/emoji_heart_anim/emoji_heart_anim.vrx')}
          resources={[
            require('../res/animated_objects/emoji_heart_anim/emoji_heart_specular.png'),
            require('../res/animated_objects/emoji_heart_anim/emoji_heart.png')
          ]}
          type="VRX"
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          highAccuracyEvents={true}
          scale={[0.2, 0.2, 0.2]}
          onClick={() => {
            this.props.removeFromBoard(this.props.id);
            this.props.addInventory(this.props.item.name, this.props.item.id);
          }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addInventory: (name, id) => dispatch(addInventory(name, id))
});

export default connect(
  null,
  mapDispatchToProps
)(Heart);
