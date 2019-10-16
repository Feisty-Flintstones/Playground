import React from 'react';
import { Viro3DObject, ViroAmbientLight } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addCoinToBoard } from '../store/boardReducer';

class Crown extends React.Component {
  render() {
    return (
      <View>
        <ViroAmbientLight color="#aaaaaa" />
        <Viro3DObject
          source={require('../res/animated_objects/crown/crown.obj')}
          resources={[require('../res/animated_objects/crown/crown.mtl')]}
          type='OBJ'
          position={[this.props.xpos, this.props.xpos, this.props.xpos]}
          scale={[0.01, 0.01, 0.01]}
          rotation={[-135, 0, -45]}
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
    addCoinToBoard: (id) => dispatch(addCoinToBoard(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crown);
