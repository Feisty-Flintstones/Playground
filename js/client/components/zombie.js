import React from 'react';
import { Viro3DObject, ViroAmbientLight, ViroSpotLight } from 'react-viro';
import { View } from 'react-native';
import { connect } from 'react-redux';
export default class Zombie extends React.Component {
  render() {
    return (
      <View>
        <ViroAmbientLight color={'#aaaaaa'} intensity={5000} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <Viro3DObject
          source={require('../res/animated_objects/zombie/zombiewalk.vrx')}
          resources={[
            require('../res/animated_objects/zombie/zombie_diffuse.png'),
            require('../res/animated_objects/zombie/zombie_normal.png'),
            require('../res/animated_objects/zombie/zombie_specular.png')
          ]}
          type="VRX"
          position={this.props.position}
          highAccuracyEvents={true}
          scale={[0.009, 0.009, 0.009]}
          // onClick={() => {
          //   this.props.addCoins();
          //   this.setState({
          //     visible: false
          //   });
          // }}
          // animation={{ name: 'rotate', run: true, loop: true }}
          // visible={this.state.visible}
        />
      </View>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   addCoins: () => dispatch(addCoins())
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(Coin);
