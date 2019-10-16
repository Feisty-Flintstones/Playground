import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addCoinToBoard } from '../store/boardReducer';

class Crown extends React.Component {
  render() {
    return (
      <View>
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
