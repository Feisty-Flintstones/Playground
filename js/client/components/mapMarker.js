import React from 'react';
import { Viro3DObject, ViroSpotLight, ViroAnimations } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeFromBoard } from '../store/boardReducer';
import { addToInventory } from '../store/inventoryReducer.js';
class MapMarker extends React.Component {
  render() {
    return (
      <View>
        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, 0]}
          position={[0, 5, 0]}
          color="#e9e9e9"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.7}
        />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          castsShadow={true}
          direction={this.props.position}
          color="#ffffff"
        />
        <Viro3DObject
          source={require('../res/animated_objects/map_marker/map_marker.obj')}
          resources={[
            require('../res/animated_objects/map_marker/map_marker.mtl')
          ]}
          type="OBJ"
          position={this.props.position}
          scale={[0.01, 0.01, 0.01]}
          rotation={[0, 0, -90]}
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
)(MapMarker);
