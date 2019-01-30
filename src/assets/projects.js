import React from 'react';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const styles = {
    paragraph: {
        marginBottom: 30,
    },
};

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
            The Open Rocketry Initiative (ORI) is an attempt to make experimental rocketry more accessible. Implementing rocket control, automatic chute deployment, and real-time systems monitoring is a complex task, and ORI provides a codebase to give open-source users the chance to explore an implementation of a real-time control system. The CAD designs for the rocket components (e.g. tube couplers, blast cap, nose cone, tail fin) are also available online. ORI consists of three simultaneous efforts:
            
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
            In June 2018, as recipients of the NASA Rhode Island Space Grant (RISG), the team had the opportunity to give a brief talk at the RISG Symposium in Providence, RI about our work on Carlson, along with the smart launchpad and motor testing. The slides are available on <Link external href='https://docs.google.com/presentation/d/1OxAxDKqtxr4odVjT6q38U2s4oX1R2K-lVKEJCeqgmxo/edit?usp=sharing' text='Google Slides' />.
        </Typography>

        <Typography styles={styles.parachute}>
            You can find additional photos and videos of ORI development on our <Link external href='https://www.instagram.com/openrocketryinitiative/' text='Instagram' />.
        </Typography>

        

    </div>
);

export const Lunadrop = props => (
    <div>
        <Typography style={styles.paragraph}>
            Lunadrop is a user-friendly autonomous drone delivery system. I worked on this project with a team initially as a DIY-type project, but it turned into a larger endeavor over the course of the semester. In addition to building a drone capable of carrying packages up to 1 kilo for ~20-25 minutes, we needed to write code that interacted with the drone's onboard flight controller, a RESTful web API, and a user-friendly web app. To  communicate with the drone in-flight, we equipped it with an LTE antenna and sim card for internet connectivity.
        </Typography>

        <Typography style={styles.paragraph}>
            I developed the server back-end and the website itself. The back-end was a Python Flask web application running on Amazon AWS. The database stored information about real-time drone position (coordinates, velocity, altitude, battery voltage). Additionally, there was a separate process that coordinated multiple drones, assigning them deliveries based on their remaining battery level. The front-end needed to be mobile-friendly, and needed to poll the server to display the drones' positions in real-time on an interface similar to Google Maps.
        </Typography>

        <Typography style={styles.paragraph}>
            We held several meetings with the University department of public safety to plan a live demonstration of Lunadrop delivery in action. For safety, we were required to fly above buildings as much as possible (instead of point-to-point), so we implemented the ability to upload a waypoint path to each drone prior to takeoff. Unfortunately, due to time constraints, we were never able to hold a live demo, but we did test the system multiple times in a safe area.
        </Typography>

        <Typography style={styles.paragraph}>
            The full source can be found <Link external href='https://github.com/IzzyBrand/dro.ne' text='here' />. My work on the web application and server back-end can be found in its most updated form <Link external href='https://github.com/benshanahan1/dronesvr' text='here' />.
        </Typography>

        <Typography style={styles.component}>
            To publicize the planned live demo and to inform about Lunadrop, we created a brief teaser video:
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