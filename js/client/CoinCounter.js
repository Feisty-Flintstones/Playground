'use strict';

import React from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { timeUp } from './store/timeReducer';

class CoinCounter extends React.Component {
  constructor() {
    super();
    this.state = { timer: 300 };
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      this.props.timeUp();
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: 2
          }}
        >
          <Text
            style={{
              color: 'white',

              fontSize: 20,
              justifyContent: 'flex-start',
              paddingRight: '65%'
            }}
          >
            {this.state.timer + 's'}
          </Text>
          <Text style={{ color: 'white', fontSize: 20 }}>
            {this.props.coins + '/6'}
          </Text>
          <Image
            source={require('./res/inventory_icons/pixel_coin.png')}
            style={{ width: 40, height: 40 }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  coins: state.inventoryReducer.coins,
  timer: state.timeReducer.timer
});
const mapDispatchToProps = dispatch => ({
  timeUp: () => {
    dispatch(timeUp());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinCounter);
