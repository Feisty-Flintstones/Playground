"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroScene, ViroText, Viro360Image } from "react-viro";

export default class HelloWorldScene extends Component {
  constructor() {
    super();

    this.state = {}; // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <ViroARPlane
          minHeight={1.5}
          minWidth={1.5}
          alignment="Horizontal"
          color="#ff0000"
        />
        {/* <Viro360Image source={require("./res/guadalupe_360.jpg")} /> */}
        {/* <ViroText text="Hello World!" width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} /> */}
      </ViroScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 60,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldScene;
