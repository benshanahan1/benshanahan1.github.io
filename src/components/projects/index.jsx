import React from 'react';
import VMatrix from './VMatrix';
import OpenRocketryInitiative from './OpenRocketryInitiative';
import Lunadrop from './Lunadrop';
import Audiolux from './Audiolux';
import vmatrixFallingDot from '../../assets/img/vmatrix/vmatrix-falling-dot.jpg';
import rocketLaunch from '../../assets/img/ori/rocket-launch.jpg';
import quad from '../../assets/img/lunadrop/quad.jpg';
import boardBottom from '../../assets/img/audiolux/board-bottom.jpg';


export const projects = [
  {
    slug: 'vmatrix',
    component: 'VMatrix',
    image: vmatrixFallingDot,
    title: 'vmatrix',
    description: 'Real-time spectrogram and audio visualizer.',
    url: 'https://github.com/benshanahan1/vmatrix',
    width: 800,
    height: 325,
  }, {
    slug: 'open-rocketry-initiative',
    component: 'OpenRocketryInitiative',
    image: rocketLaunch,
    title: 'Open Rocketry Initiative',
    description: 'Open-sourced experimental rocketry.',
    url: 'https://github.com/openrocketryinitiative',
    width: 800,
    height: 325,
  }, {
    slug: 'lunadrop',
    component: 'Lunadrop',
    image: quad,
    title: 'Lunadrop',
    description: 'Automated drone-delivery service.',
    url: 'https://github.com/benshanahan1/dronesvr',
    width: 800,
    height: 330,
  }, {
    slug: 'audiolux',
    component: 'Audiolux',
    image: boardBottom,
    title: 'Audiolux',
    description: 'Real-time audio LED lightshow.',
    url: 'https://github.com/benshanahan1/audiolux2',
    width: 800,
    height: 340,
  },
];


export function getComponent(project, dimensions) {
  switch (project.component) {
    case 'VMatrix':
      return <VMatrix project={project} dimensions={dimensions} />;
    case 'OpenRocketryInitiative':
      return <OpenRocketryInitiative project={project} dimensions={dimensions} />;
    case 'Lunadrop':
      return <Lunadrop project={project} dimensions={dimensions} />;
    case 'Audiolux':
      return <Audiolux project={project} dimensions={dimensions} />;
    default:
      return <div />;
  }
}
