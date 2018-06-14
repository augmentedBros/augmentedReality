'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.3,.3,.3]} height={1} width={4} position={[0,.5,-1]} style={styles.HelloWorldTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0,3,1]}/>

        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={()=>{}}> 
          <Viro3DObject 
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            position={[0, .5, 0]}
            scale={[.2, .2, .2]}
            type="VRX"
            // dragType="FixedDistance" onDrag={()=>{}} 
            />
        </ViroNode>

        <ViroText text="I'm a box!!!!" scaled={[.5, .5, .5]} position={[0, 5, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -.5, -1]} scale={[.4, .4, .2]} materials={["grid"]}/>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "OH GODDD!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg')
  },
})

module.exports = HelloWorldSceneAR;
