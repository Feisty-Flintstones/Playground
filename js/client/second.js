import React from 'react';
import {Viro3DObject} from 'react-viro'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux';
import { setUserPosition } from "./store/index.js";
import {removedView} from './store/boardReducer'

class Testing extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
        <View><Viro3DObject
              source={require("./res/animated_objects/emoji_poop_anim/emoji_poop_anim.vrx")}
              type="VRX"
              position={[-1.5,0,0]}
              scale={[0.2, 0.2, 0.2]}
              onClick = {() => {
                this.props.falsifyView(this.props.id)
             }}
            />
            </View>
            
        )
    }
}
const mapStateToProps = state => ({
    position: state.userReducer.position,
    calibration: state.boardReducer.calibration
  });
  
const mapDispatchToProps = dispatch => ({
    setUserPos: position => dispatch(setUserPosition(position)),
    falsifyView: id => dispatch(removedView(id))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Testing)
