import React from 'react';
import { Viro3DObject, ViroSpotLight } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard, addCoinToBoard } from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';

class Lock extends React.Component {
  render() {
    return (
      <View>
        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, 0]}
          position={[3.5, 5, 0]}
          color='#e9e9e9'
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.7}
        />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[3.5, 3, 1]}
          color='#e9e9e9'
          castsShadow={true}
        />

        <Viro3DObject
          viroTag='lock'
          source={require('../res/padlock/scene.gltf')}
          type='GLTF'
          highAccuracyEvents={true}
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          scale={[0.024, 0.024, 0.024]}
          physicsBody={{
            type: 'dynamic',
            mass: 1,
            useGravity: false,
            shape: {
              type: 'Sphere',
              params: [0.15]
            }
          }}
          onCollision={tag => {
            if (tag === 'key') {
              this.props.addCoinToBoard(this.props.id);
            }
          }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeFromBoard: id => dispatch(removeFromBoard(id)),
  addToInventory: (name, id) => dispatch(addToInventory(name, id)),
  addCoinToBoard: id => dispatch(addCoinToBoard(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Lock);
