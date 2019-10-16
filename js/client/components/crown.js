import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addCoinToBoard } from '../store/boardReducer';

class Crown extends React.Component {
  render() {
    return (
      <View>
        <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 0]}
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
            position={[0, 3, 1]}
            color='#ffffff'
            castsShadow={true}
        />
        <Viro3DObject
          source={require('../res/animated_objects/crown/crown.obj')}
          resources={[require('../res/animated_objects/crown/crown.mtl')]}
          type='OBJ'
          position={[this.props.xpos, this.props.xpos, this.props.xpos]}
          scale={[0.01, 0.01, 0.01]}
          rotation={[-90, 0, 0]}
          onClick={() => {
            this.props.addCoinToBoard(this.props.id)
          }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    addCoinToBoard: (name, id) => dispatch(addCoinToBoard(name, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crown);
