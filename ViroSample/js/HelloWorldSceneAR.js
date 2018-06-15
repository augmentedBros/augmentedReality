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
  ViroAnimations,
  ViroARImageMarker,

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
        <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .3]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}  dragType="FixedDistance" onDrag={()=>{}}  />
      
        <ViroARImageMarker target={"logo"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates} >
          <Viro3DObject
            scale={[0,0,0]}
            source={[require('./res/tesla/object_car.mt1'),
                    ]}
            type="OBJ"
            materials={this.state.texture}
            onClick={this._toggleButtons}
            animation={{name:"scaleCar", run: this.state.animateCar,}} />

          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0,-1,0]}
            position={[0,5,1]}
            color="ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={.7} />
          
          <ViroQuad
            rotation={[-90,0,0]}
            position={[0, -0.001, 0]}
            width={2.5} height={2.5}
            arShadowReceiver={true} />

       </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Oh hi mark!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

//STYLES
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

//MATERIALS
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg')
  },
})

//ANIMATIONS
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },

  scaleUp:{properties:{scaleX: 1, scaleY: 1, scaleZ: 1,},
      duration: 500, easing: "bounce" },
  scaleDOwn:{properties:{scaleX: 0, scaleY: 0, scaleZ: 0,},
      duration: 200,},
  scaleCar:{properties:{scaleX: .09, scaleY: .09, scaleZ: .09,},
      duration: 500, easing: "bounce" },
  
  scaleSphereUp:{properties:{scaleX: .8, scaleY: .8, scaleZ: .8},
      duration: 50, easing: "easeineaseout"},
  scaleSphereDOwn:{properties:{scaleX:1, scaleY:1, scaleZ: 1,},
      duration: 50, easing: "easeineaseout"},
  tapAnimation:[["scaleSphereUp", "scaleSphereDown"],]
})

ViroARTrackingTargets.createTargets({
  logo: {
    source: require('./res/logo.png'),
    orientation: "Up",
    physicalWidth: 0.165 //real world width in meters
  }
})

module.exports = HelloWorldSceneAR;
