import React from 'react';
import { Viro3DObject, ViroMaterials } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard, moveBoardPiece } from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';

class Key extends React.Component {
  constructor() {
    super();
    this.state = {
      isDragging: false
    };
    isFound = false
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
          onDrag={position => {
            this.setState({
              isDragging: true
            });
            this.isFound=true
            this.props.moveBoardPiece(this.props.id, position);
          }}
          onClickState={state => {
            if (state === 2) {
              this.setState({
                isDragging: false
              });
              if (!this.state.isDragging) {
                this.props.removeFromBoard(this.props.id);
                this.props.addToInventory(this.props.item.name, this.props.id);
              }
            }
          }}
          visible={this.props.visible || this.isFound}
          physicsBody={{
            type: 'kinematic',
            mass: 0,
            useGravity: false,
            shape: {
              type: 'Compound'
            }
          }}
          onCollision={tag => {
            if (tag === 'lock') {
              this.props.removeFromBoard(this.props.id);
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
  moveBoardPiece: (id, position) => dispatch(moveBoardPiece(id, position))
});

export default connect(
  null,
  mapDispatchToProps
)(Key);
