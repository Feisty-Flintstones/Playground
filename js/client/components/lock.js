import React from 'react';
import { Viro3DObject, } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer'
import { addToInventory } from '../store/inventoryReducer.js';


class Lock extends React.Component {
  onCollide(tag){
    if (tag === "key"){
      
    }
  }
  render() {
    return (
        <View>
            <Viro3DObject
                viroTag="lock"
                source={require('../res/padlock/scene.gltf')}
                type="GLTF"
                highAccuracyEvents={true}
                position={[this.props.xpos, this.props.ypos, this.props.zpos]}
                scale={[0.012, 0.012, 0.012]}
                physicsBody={{
                    type:'static',
                    mass: 1
                }}
                onCollision={this.onCollide}
                visible={this.props.visible}
            />
        </View>
        );
    }
}

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
)(Lock);
