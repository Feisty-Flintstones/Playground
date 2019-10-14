'use strict';

import React, { Component } from 'react';
import XBar from 'react-native-x-bar';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { removeFromInventory } from './store/inventoryReducer.js';
import { addToBoard, setCalibration } from './store/boardReducer.js';

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
    padding: 'auto',
    backgroundColor: '#fcfcfc',
    borderColor: '#ddd',
    borderWidth: 1
  },
  slots1: {
    width: '50%'
    // padding: 15,
    // backgroundColor: '#fcfcfc',
    // borderColor: '#ddd',
    // borderWidth: 1
  },
  menu: {
    padding: 0,
    color: 'blue'
  },

  hasTwoTextChildren: {
    paddingVertical: 6.5,
    paddingHorizontal: 15
  }
});

class DisconnectedInventory extends Component {
  constructor() {
    super();
    this.state = {
      menuClicked: false
    };
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {!this.state.menuClicked ? (
          <View
            style={{
              height: '100%',
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 2
            }}
          >
            <XBar
              slots={[
                {
                  style: styles.slots
                },
                this.props.inv.map(item => {
                  return {
                    children:
                      item.name === 'Smiley' ? (
                        <Image
                          source={require('./res/inventory_icons/pixel_smiley.png')}
                          style={{ height: 50, width: 50 }}
                        />
                      ) : item.name === 'Poop' ? (
                        <Image
                          source={require('./res/inventory_icons/pixel_turd.png')}
                          style={{ height: 50, width: 50 }}
                        />
                      ) : (
                        <View />
                      ),
                    onPress: () => {
                      this.props.addToBoard(item.id);
                      this.props.removeFromInventory(item.id);
                    }
                  };
                })
              ]}
              activeOpacity={0.5}
            />
          </View>
        ) : (
          <View style={{ width: '83%' }}>
            <XBar
              slots={[
                // {
                //   style: styles.slots1
                // },
                {
                  children: (
                    <View
                      style={{
                        backgroundColor: 'gray',
                        borderWidth: 1,
                        borderColor: '#ddd',
                        width: '100%',
                        padding: 15
                      }}
                    >
                      <Text>RECALIBRATE</Text>
                    </View>
                  ),
                  style: {
                    width: '50%'
                  },
                  onPress: () => {
                    console.log('you dare challenge me?');
                    this.props.setCalibration(false);
                  },
                  activeOpacity: 0.5
                },
                {
                  children: (
                    <View
                      style={{
                        backgroundColor: 'gray',
                        borderWidth: 1,
                        borderColor: '#ddd',
                        width: '100%',
                        padding: 15
                      }}
                    >
                      <Text>EXIT</Text>
                    </View>
                  ),
                  style: {
                    width: '50%'
                  },

                  onPress: () => {
                    console.log('you dare challenge me?');
                    this.props.onExitViro();
                  },
                  activeOpacity: 0.5
                }
              ]}
              layout='absolute center'
              groups={[0, 1]}
            />
          </View>
        )}

        <View style={{ width: '20%', aligntItems: 'flex-end' }}>
          <XBar
            slots={[
              {
                children: <Text>MENU</Text>,

                style: {
                  backgroundColor: 'gray',
                  padding: 15,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  alignItems: 'stretch'
                },
                onPress: () =>
                  this.setState({ menuClicked: !this.state.menuClicked }),
                activeOpacity: 0.5
              }
            ]}
            layout='absolute center'
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  inv: state.inventoryReducer.inv
});

const mapDispatchToProps = dispatch => ({
  removeFromInventory: id => dispatch(removeFromInventory(id)),
  addToBoard: id => dispatch(addToBoard(id)),
  setCalibration: bool => dispatch(setCalibration(bool))
});
const Inventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedInventory);

export default Inventory;
/*<XBar
            slots={[
              {
                style: styles.slots
              },
              this.props.inv.map(item => {
                return {
                  children:
                    item.name === 'Smiley' ? (
                      <Image
                        source={require('./res/inventory_icons/pixel_smiley.png')}
                        style={{ height: 30, width: 50 }}
                      />
                    ) : item.name === 'Poop' ? (
                      <Image
                        source={require('./res/inventory_icons/pixel_turd.png')}
                        style={{ height: 30, width: 50 }}
                      />
                    ) : (
                      <View />
                    ),
                  onPress: () => {
                    this.props.addToBoard(item.id);
                    this.props.removeFromInventory(item.id);
                  }
                };
              })
            ]}
            activeOpacity={0.5}
            style={{
              // height: 50,
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 2
            }}
          />*/
