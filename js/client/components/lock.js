import React from 'react';
import { Viro3DObject, } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer'
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
                position={[0, 0.05, 0]}
                scale={[0.005, 0.005, 0.005]}
                // physicsBody={{
                //     type:'static',
                //     mass: 1
                // }}
                // onCollision={this.onCollide}
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
