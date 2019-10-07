import React from 'react';
import { Viro3DObject } from 'react-viro';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setUserPosition } from './store/index.js';
import { removedView } from './store/boardReducer';
import { addInventory } from './store/inventoryReducer.js';
class Smiley extends React.Component {
  constructor() {
    super();
    this.state = {
      isClicked: false
    };
  }

  render() {
    return (
      <View>
        <Viro3DObject
          source={require('./res/animated_objects/emoji_smile/emoji_smile.vrx')}
          type='VRX'
          position={[ // might be worth mapping here instead of hard coding
            this.props.position[0],
            this.props.position[1],
            this.props.position[2]
          ]}
          scale={[0.2, 0.2, 0.2]}
          onDrag={(position, source) => {
            this.props.setUserPos(position);
          }}
          onClick={() => {
            this.props.falsifyView(this.props.id);
            this.props.addInventory(this.props.name, this.props.id);
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
  addInventory: (name, id) => dispatch(addInventory(name, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Smiley);
