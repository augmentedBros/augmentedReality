'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroSceneNavigator,
  ViroScene,
  ViroARScene,
  ViroAmbientLight,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroAnimations
} from 'react-viro';

var createReactClass = require('create-react-class');
var MainScene = createReactClass({

  render: function() {
    return (
      <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
          <ViroPortal position={[0, 0, -1]} scale={[.1, .1, .1]}>
            <Viro3DObject source={require('../portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('../portal_res/portal_ship/portal_ship_diffuse.png'),
                          require('../portal_res/portal_ship/portal_ship_normal.png'),
                          require('../portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX"
              dragType="FixedDistance" 
              onDrag={()=>{}} 
              // animation={{name: "rotate", run: true, loop: true}}
              />
          </ViroPortal>
          <Viro360Image source={require("../portal_res/360_island.jpg")} />
        </ViroPortalScene>
      </ViroARScene>
    );
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250,
  }
})
module.exports = MainScene;