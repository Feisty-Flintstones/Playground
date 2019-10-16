import React from 'react';
import { Viro3DObject, ViroAmbientLight } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addCoinToBoard } from '../store/boardReducer';
class Heart extends React.Component {
  render() {
    return (
      <View>
        <ViroAmbientLight color='#aaaaaa' />
        <Viro3DObject
          source={require('../res/animated_objects/emoji_heart_anim/emoji_heart_anim.vrx')}
          resources={[
            require('../res/animated_objects/emoji_heart_anim/emoji_heart_specular.png'),
            require('../res/animated_objects/emoji_heart_anim/emoji_heart.png')
          ]}
          type='VRX'
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          rotation={[0, 0, 0]}
          highAccuracyEvents={true}
          scale={[0.2, 0.2, 0.2]}
          onClick={() => {
            this.props.addCoinToBoard(this.props.id);
          }}
          visible={this.props.visible}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCoinToBoard: id => dispatch(addCoinToBoard(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Heart);
