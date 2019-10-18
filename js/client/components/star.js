import React from 'react';
import { Viro3DObject, ViroMaterials } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addCoinToBoard } from '../store/boardReducer';

class Star extends React.Component {
  render() {
    return (
      <View>
        <Viro3DObject
          source={require('../res/animated_objects/object_star_anim/object_star_anim.vrx')}
          type='VRX'
          materials='star'
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          highAccuracyEvents={true}
          scale={[0.05, 0.05, 0.05]}
          onClick={() => {
            this.props.addCoinToBoard(this.props.id);
          }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}

ViroMaterials.createMaterials({
  star: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('../res/animated_objects/object_star_anim/object_star_diffuse.png'),
    specularTexture: require('../res/animated_objects/object_star_anim/object_star_specular.png')
  }
});

const mapDispatchToProps = dispatch => ({
  addCoinToBoard: id => dispatch(addCoinToBoard(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Star);
