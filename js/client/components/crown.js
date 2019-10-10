import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';
class Crown extends React.Component {
  render() {
    return (
      <View>
        <Viro3DObject
          source={require('../res/animated_objects/crown/crown.obj')}
          type='OBJ'
          position={this.props.position}
          scale={[0.01, 0.01, 0.01]}
          rotation={[-90, 0, 0]}
          onClick={() => {
            // this.props.removeFromBoard(this.props.item.id);
            // this.props.addToInventory(this.props.item.name, this.props.item.id);
          }}
          //   visible={this.props.visible}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  //   position: state.boardReducer.boardPieces[0].position
});

const mapDispatchToProps = dispatch => ({
  //   removeFromBoard: id => dispatch(removeFromBoard(id)),
  //   addToInventory: (name, id) => dispatch(addToInventory(name, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crown);
