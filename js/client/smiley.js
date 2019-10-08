import React from 'react';
import { Viro3DObject } from 'react-viro';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setUserPosition } from './store/index.js';
import { removedView } from './store/boardReducer';
import { addInventory, getInventory } from './store/inventoryReducer.js';
class Smiley extends React.Component {

    constructor() {
        super();

    }
  
  render() {
    return (
      <View>
        <Viro3DObject
          source={require('./res/animated_objects/emoji_smile/emoji_smile.vrx')}
          type='VRX'
          position={[
            this.props.position[0],
            this.props.position[1],
            this.props.position[2]
          ]}
          anchorId={1}
          highAccuracyEvents={true}
          scale={[0.2, 0.2, 0.2]}
          onDrag={(position, source) => {
            this.props.setUserPos(position);
          }}
          onClick={async () => {
            this.props.falsifyView(this.props.id);
            await this.props.addInventory(this.props.name, this.props.id);
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  position: state.userReducer.position,
  calibration: state.boardReducer.calibration
});

const mapDispatchToProps = dispatch => ({
  setUserPos: position => dispatch(setUserPosition(position)),
  falsifyView: id => dispatch(removedView(id)),
  addInventory: (name, id) => dispatch(addInventory(name, id)),
  getInventory: () => dispatch(getInventory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Smiley);
