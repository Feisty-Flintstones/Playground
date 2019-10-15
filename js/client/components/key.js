import React from 'react';
import { Viro3DObject, ViroMaterials } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {removeFromBoard } from '../store/boardReducer'
import { addToInventory } from '../store/inventoryReducer.js';


class Key extends React.Component {
  render() {
    return (
        <View>
            <Viro3DObject
                viroTag="key"
                source={require('../res/Key_B.obj/Key_B_02.obj')}
                type="OBJ"
                materials="key"
                highAccuracyEvents={true}
                position={[this.props.xpos, this.props.ypos, this.props.zpos]}
                scale={[0.012, 0.012, 0.012]}
                onClick={() => {
                    this.props.removeFromBoard(this.props.id);
                    this.props.addToInventory(this.props.item.name, this.props.id);
                }}
                visible={this.props.visible}
                // physicsBody={{
                // type:'kinematic',
                // mass: 0
                // }}
            />
        </View>
        );
    }
}

ViroMaterials.createMaterials({
    key: {
        shininess: 2.0,
        lightingModel: "Blinn",
        diffuseTexture: require('../res/Key_B.obj/keyB_tx.bmp')
    },
});

const mapStateToProps = state => ({
  // position: state.boardReducer.boardPieces[0].position
});

const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Key);

