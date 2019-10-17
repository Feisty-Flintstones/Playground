import React from 'react';
import { Viro3DObject, ViroAmbientLight } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addCoinToBoard } from '../store/boardReducer';

class Smiley extends React.Component {
  render() {
    return (
      <View>
        <ViroAmbientLight color='#aaaaaa' intensity={100} />
        <Viro3DObject
          source={require('../res/animated_objects/emoji_smile/emoji_smile.vrx')}
          type='VRX'
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          anchorId={1}
          highAccuracyEvents={true}
          rotation={[-45, 180, 0]}
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
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addCoinToBoard: id => dispatch(addCoinToBoard(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Smiley);
