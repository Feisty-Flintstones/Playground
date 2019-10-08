import React from 'react';
import { Viro3DObject } from 'react-viro';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setUserPosition } from './store/index.js';
import { removedView } from './store/boardReducer';
import { addInventory, getInventory } from './store/inventoryReducer.js';
class Heart extends React.Component {
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
          //   anchorId={foundAnchor.anchorId}
          source={require('./res/animated_objects/emoji_heart_anim/emoji_heart_anim.vrx')}
          resources={[
            require('./res/animated_objects/emoji_heart_anim/emoji_heart_specular.png'),
            require('./res/animated_objects/emoji_heart_anim/emoji_heart.png')
          ]}
          type='VRX'
          position={[0, 0, 4]}
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
)(Heart);
