'use strict';

import React, { Component } from 'react';
import XBar from 'react-native-x-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { removeFromInventory } from './store/inventoryReducer.js';
import { addToBoard } from './store/boardReducer.js';

const styles = StyleSheet.create({
  bar: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fcfcfc',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15
  },

  slots: {
    padding: 15,
    backgroundColor: '#fcfcfc',
    borderColor: '#ddd',
    borderWidth: 1
  },

  hasTwoTextChildren: {
    paddingVertical: 6.5,
    paddingHorizontal: 15
  }
});

class DisconnectedInventory extends Component {
  render() {
    return (
      <View>
        <XBar
          slots={[
            {
              style: styles.slots
            },
            this.props.inv.map(item => {
              return {
                children: <Text>{item.name}</Text>,
                onPress: () => {
                  this.props.addToBoard(item.id);
                  this.props.removeFromInventory(item.id);
                }
              };
            })
          ]}
          activeOpacity={0.5}
          style={{
            height: 50,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 2
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  inv: state.inventoryReducer.inv
});

const mapDispatchToProps = dispatch => ({
  removeFromInventory: id => dispatch(removeFromInventory(id)),
  addToBoard: id => dispatch(addToBoard(id))
});
const Inventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedInventory);

export default Inventory;
