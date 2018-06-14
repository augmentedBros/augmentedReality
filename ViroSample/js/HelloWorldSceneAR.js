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

// var createReactClass = require('create-react-class')
// var HelloWorldSceneAR = createReactClass({
//   getInitialState() {
//     return {
//       text : 'Initializing AR...'
//     }
//   },
//   render: function () {
//     return (
//       <ViroARScene onTrackingInitialzed={()=>{this.setState({text : "Hello World!"})}}>
//         <ViroText text={this.state.text} scale={[.1,.1,.1]} height={1} width={4} position={[0,.5,-1]} style={styles.HelloWorldTextStyle} />
//         <ViroAmbientLight color={"#aaaaaa"}/>
//         <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0,3,1]}/>
//         <Viro3DObject 
//           source={require('./res/emoji_smile/emoji_smile.vrx')}
//           position={[0,0,-1]}
//           scale={[.2,.2,.2]}
//           type="VRX"
//           dragType="FixedDistance" onDrag={()=>{}}
//         />
//          <Viro3DObject 
//           source={require('./res/emoji_smile/emoji_smile.vrx')}
//           position={[1,1,-10]}
//           scale={[1,1,1]}
//           type="VRX"
//           dragType="FixedDistance" onDrag={()=>{}}
//         />
//       </ViroARScene>
//     )
//   }
// })

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
        <ViroText text={this.state.text} scale={[.1,.1,.1]} height={1} width={4} position={[0,.5,-1]} style={styles.HelloWorldTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0,3,1]}/>

        <Viro3DObject 
          source={require('./res/emoji_smile/emoji_smile.vrx')}
          position={[0,0,-1]}
          scale={[.2,.2,.2]}
          type="VRX"
          dragType="FixedDistance" onDrag={()=>{}}
        />
        <Viro3DObject 
          source={require('./res/emoji_smile/emoji_smile.vrx')}
          position={[1,1,-10]}
          scale={[1,1,1]}
          type="VRX"
          dragType="FixedDistance" onDrag={()=>{}}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Fullstack shenanigans!"
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

module.exports = HelloWorldSceneAR;
