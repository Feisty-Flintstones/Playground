'use strict';

import React, { Component } from 'react';
import XBar from 'react-native-x-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { deleteInventory, getInventory } from './store/inventoryReducer.js';
import { addView } from './store/boardReducer.js';

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
  componentDidMount() {
    this.props.getInventory();
  }

  render() {
    return (
      <View>
        {/* {this.props.getInventory()} */}
        <XBar
          slots={[
            {
              style: styles.slots
            },
            [
              {
                children: <Text>{this.props.inv[0].name}</Text>,
                onPress: () => {
                  Alert.alert(this.props.inv[0].id + '');
                  this.props.addView(this.props.inv[0].id);
                  this.props.deleteInventory(this.props.inv[0].id);
                }
              },
              {
                children: <Text>{this.props.inv[1].name}</Text>,
                onPress: () => {
                  Alert.alert(this.props.inv[1].id + '');
                  this.props.addView(this.props.inv[1].id);
                  this.props.deleteInventory(this.props.inv[1].id);
                }
              },
              {
                children: <Text>{this.props.inv[2].name}</Text>,
                onPress: () => {
                  Alert.alert(this.props.inv[2].id + '');
                  this.props.addView(this.props.inv[2].id);
                  this.props.deleteInventory(this.props.inv[2].id);
                }
              }
            ]
          ]}
          onPress={() => {
            this.props.getInventory();
          }}
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
  deleteInventory: id => dispatch(deleteInventory(id)),
  addView: id => dispatch(addView(id)),
  getInventory: () => dispatch(getInventory())
});
const Inventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedInventory);

export default Inventory;
