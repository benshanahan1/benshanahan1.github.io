import React from 'react';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const styles = {
    paragraph: {
        marginBottom: 30,
    }
}

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
    <div>
        <Typography style={styles.paragraph}>
            The Open Rocketry Initiative (ORI) is an attempt to make experimental rocketry more accessible. Implementing rocket control, automatic chute deployment, and real-time systems monitoring is a complex task, and ORI provides a codebase to give open-source users the chance to explore an implementation of a real-time control system. ORI consists of three simultaneous efforts:
            
            <ul>
                <li><strong>Rocket flight computer</strong> &mdash; measure real-time rocket position and control chute deployment (<Link external href='https://github.com/openrocketryinitiative/carlson' text='repo' />)</li>
                <li><strong>Smart launchpad</strong> &mdash; trigger launch over WiFi and measure motor thrust curves (<Link external href='https://github.com/openrocketryinitiative/launchpad' text='repo' />)</li>
                <li><strong>Motors</strong> &mdash; optimize rocket motor thrust curves by adjusting fuel mixtures (<Link external href='https://github.com/openrocketryinitiative/motors' text='repo' />)</li>
            </ul>
        </Typography>

        <Typography style={styles.paragraph}>
            I lead development of the rocket flight computer, lovingly nicknamed Carlson. Sporting a Raspberry Pi Zero, Carlson is built and programmed to monitor real-time rocket orientation during flight. Carlson has a 10-DOF MPU9255 inertial monitoring unit that includes an accelerometer, gyroscope, magnetometer, and barometer. The ORI team has successfully deployed Carlson in numerous launches and the collected orientation data permitted the development of a real-time apogee-detection algorithm.
        </Typography>

        <Typography style={styles.paragraph}>
            This algorithm first detects rocket freefall (zero acceleration across all three axes) and then looks for an angle of deviation of more than 90 degrees from vertical. When these two conditions are met, indicating the rocket is falling downwards, the Raspberry Pi shorts a relay that heats some Nichrome wire, igniting the rocket's blast-cap and ejecting the parachute. Here's a video of the <Link external href='https://www.instagram.com/p/Bb0dSJujduq/' text='parachute being ejected' />.
        </Typography>

        <Typography style={styles.paragraph}>
            In June 2018, the team had the opportunity to give a brief talk at the NASA Rhode Island Space Grant Symposium in Providence, RI about our work on Carlson, along with the smart launchpad and motor testing. The slides are available on <Link external href='https://docs.google.com/presentation/d/1OxAxDKqtxr4odVjT6q38U2s4oX1R2K-lVKEJCeqgmxo/edit?usp=sharing' text='Google Slides' />.
        </Typography>

        <Typography styles={styles.parachute}>
            You can find additional photos and videos of ORI development on our <Link external href='https://www.instagram.com/openrocketryinitiative/' text='Instagram' />.
        </Typography>

        

    </div>
);

export const Lunadrop = props => (
    <div>
        <Typography style={styles.paragraph}>
            Lunadrop is a user-friendly autonomous drone delivery system. I worked on this project with a friend from University initially as a DIY-type project, but it turned into a larger endeavor over the course of the semester. In addition to building a physical drone that was able to carry packages up to 1 kilo for ~20-25 minutes, there was a large amount of software that needed to be developed, including a RESTful web API, a user-friendly web app, and code that interacted with the drone's onboard flight controller.
        </Typography>

        <Typography style={styles.paragraph}>
            Most of my time was spent on development of the server back-end and the user-facing interface. The back-end was a Python Flask web application connected to a SQL database hosted on a EC2 instance on Amazon Web Services (AWS). The database stored information about the application user and real-time drone positioning (e.g. current coordinates, velocity, altitude, remaining battery voltage, and additional identifying meta information such as carry-capacity). Additionally, we had a separate Manager process that could coordinate multiple drones, assigning them to user orders based on proximity, carry-capacity, and remaining battery level. Since we only prototyped the system with a single drone, we didn't have the chance to fly multiple drones using the developed infrastructure.
        </Typography>

        <Typography style={styles.paragraph}>
            The application user interface, or the web page that the user would access on their phone or computer, had a number of different requirements. Most notably, it needed to be mobile-device friendly, since the delivery service required users to be outside for deliveries.
        </Typography>

        CAD design of gripper mechanism, mounting to drone

        Required to fly over buildings instead of beeline

        Meetings with department of public safety at the University to schedule a live delivery demonstration on one of the main University greens.

        Other related code.
        https://github.com/IzzyBrand/dro.ne

        Most up-to-date version of the web application.
        https://github.com/benshanahan1/dronesvr

        <Typography style={styles.paragraph}>
            Lunadrop is a comprehensive drone delivery system. Immediately after a customer places an order on the website, the delivery gets packaged and strapped to one of the luna drones. The drone then flies autonomously from the central hub to the requested landing site, safely descends to drop off the package, and flies back to the central hub where it awaits the next order.
        </Typography>

        <Typography style={styles.component}>
            To publicize the planned live demo and also inform others about Lunadrop, we created a brief teaser video:
        </Typography>

        <YouTube
            videoId='Rt-q0L54g0c'
            opts={{
                width: '100%',
                height: props.dimensions.isMobile ? 200 : 500,
            }}
        />

    </div>
);

export const Jukebox = props => (
    <Typography style={styles.paragraph}>Jukebox</Typography>
);

export const Audiolux = props => (
    <Typography style={styles.paragraph}>Audiolux</Typography>
);

export const Semio = props => (
    <Typography style={styles.paragraph}>Semio</Typography>
);

export function getComponent(project, dimensions) {
    switch (project.component) {
        case 'OpenRocketryInitiative':
            return <OpenRocketryInitiative project={project} dimensions={dimensions}/>;
        case 'Lunadrop':
            return <Lunadrop project={project} dimensions={dimensions} />;
        case 'Jukebox':
            return <Jukebox project={project} dimensions={dimensions} />;
        case 'Audiolux':
            return <Audiolux project={project} dimensions={dimensions} />;
        case 'Semio':
            return <Semio project={project} dimensions={dimensions} />;
        default:
            return <div />;
    }
}