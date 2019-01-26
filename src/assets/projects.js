import React from 'react';

export const projects = [
    {
        slug: 'open-rocketry-initiative',
        component: 'OpenRocketryInitiative',
        image: 'https://picsum.photos/800/325',
        title: 'Open Rocketry Initiative',
        description: 'Open-sourced experimental rocketry.',
        url: 'https://github.com/openrocketryinitiative',
        width: 800,
        height: 325,
    }, {
        slug: 'lunadrop',
        component: 'Lunadrop',
        image: 'https://picsum.photos/800/330',
        title: 'Lunadrop',
        description: 'Automated drone-delivery service.',
        url: 'https://www.google.com/',
        width: 800,
        height: 330,
    }, {
        slug: 'jukebox',
        component: 'Jukebox',
        image: 'https://picsum.photos/800/335',
        title: 'Jukebox',
        description: 'Crowd-sourced Spotify playlists.',
        url: 'https://www.google.com/',
        width: 800,
        height: 335,
    }, {
        slug: 'audiolux',
        component: 'Audiolux',
        image: 'https://picsum.photos/800/340',
        title: 'Audiolux',
        description: 'Audio-synchronized LED lightshow.',
        url: 'https://www.google.com/',
        width: 800,
        height: 340,
    }, {
        slug: 'semio',
        component: 'Semio',
        image: 'https://picsum.photos/800/345',
        title: 'Semio',
        description: 'Seizure onset zone probability calculator.',
        url: 'https://www.google.com/',
        width: 800,
        height: 345,
    },
];

export const OpenRocketryInitiative = props => (
    <div>Open Rocketry Initiative: {props.project.url}</div>
);

export const Lunadrop = props => (
    <div>Lunadrop</div>
);

export const Jukebox = props => (
    <div>Jukebox</div>
);

export const Audiolux = props => (
    <div>Audiolux</div>
);

export const Semio = props => (
    <div>Semio</div>
);

export function getComponent(project) {
    switch (project.component) {
        case 'OpenRocketryInitiative':
            return <OpenRocketryInitiative project={project} />;
        case 'Lunadrop':
            return <Lunadrop project={project} />;
        case 'Jukebox':
            return <Jukebox project={project} />;
        case 'Audiolux':
            return <Audiolux project={project} />;
        case 'Semio':
            return <Semio project={project} />;
        default:
            return <div />;
    }
}