import React from 'react';
import { Viro3DObject } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {addCoinToBoard} from '../store/boardReducer'

class Smiley extends React.Component {
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
          source={require('../res/animated_objects/emoji_smile/emoji_smile.vrx')}
          type='VRX'
          position={[this.props.xpos, this.props.ypos, this.props.zpos]}
          anchorId={1}
          highAccuracyEvents={true}
          scale={[0.2, 0.2, 0.2]}
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
  addCoinToBoard: id => dispatch(addCoinToBoard(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Smiley);
