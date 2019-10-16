import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard, addCoinToBoard } from '../store/boardReducer'
import { addToInventory } from '../store/inventoryReducer.js';


class Lock extends React.Component {
  
  render() {
    return (
        <View>
            <Viro3DObject
                viroTag="lock"
                source={require('../res/padlock/scene.gltf')}
                type="GLTF"
                highAccuracyEvents={true}
                position={[this.props.xpos, this.props.ypos, this.props.zpos]}
                scale={[0.024, 0.024, 0.024]}
                physicsBody={{
                    type:'static',
                    mass: 0,
                    shape: {
                      type: "Compound"
                    }
                }}
                onCollision={(tag) => {
                  if(tag === "key"){
                    this.props.addCoinToBoard(this.props.id)
                  }}}
                visible={this.props.visible}
            />
        </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id)),
  addCoinToBoard: id => dispatch(addCoinToBoard(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Lock);
