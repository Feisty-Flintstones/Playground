import React from 'react';
import { Viro3DObject, ViroMaterials } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  removeFromBoard,
  moveBoardPiece,
  addCoinToBoard
} from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';

class Key extends React.Component {
  constructor() {
    super();
    this.isFound = false;
    this.isDragging = false,
    this.hasCollided = false
  }

  render() {
    return (
      <View>
        <Viro3DObject
          viroTag='key'
          source={require('../res/Key_B.obj/Key_B_02.obj')}
          type='OBJ'
          materials='key'
          highAccuracyEvents={true}
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          scale={[0.024, 0.024, 0.024]}
          onCollision={tag => {
            if (tag === 'lock') {
              this.hasCollided = true
            }
          }}
          onDrag={() => {
            this.isDragging = true
            this.isFound = true;
          }}
          onClickState={state => {
            if (state === 2) {
              this.isFound = true;
              if (this.hasCollided) this.props.removeFromBoard(this.props.id);
              if (!this.isDragging) {
                this.props.removeFromBoard(this.props.id);
                this.props.addToInventory(this.props.item.name, this.props.id);
              }
              this.isDragging = false
            }
          }}
          visible={this.props.visible || this.isFound}
          physicsBody={{
            type: 'kinematic',
            shape: {
              type: 'Sphere',
              params: [0.15]
            }
          }}
        />
      </View>
    );
  }
}

ViroMaterials.createMaterials({
  key: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('../res/Key_B.obj/keyB_tx.bmp')
  }
});
const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id)),
  moveBoardPiece: (id, position) => dispatch(moveBoardPiece(id, position)),
  addCoinToBoard: id => dispatch(addCoinToBoard(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Key);
