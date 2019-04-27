import React from 'react';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

/* ORI images */
import carlsonHousingCanards from './img/ori/carlson-housing-w-canards.jpg';
import clearMotor from './img/ori/clear-motor.jpg';
import launchpad from './img/ori/launchpad.jpg';
import rocketLaunch from './img/ori/rocket-launch.jpg';

/* Lunadrop images */
import esc4in1 from './img/lunadrop/esc-4in1.jpg';
// import gripperCloseup from './img/lunadrop/gripper-closeup.jpg';
import quad from './img/lunadrop/quad.jpg';
// import quadComputer from './img/lunadrop/quad-and-computer.jpg';
import quadCloseup from './img/lunadrop/quad-closeup.jpg';

/* Audiolux images */
import boardBottom from './img/audiolux/board-bottom.jpg';
import caseSide from './img/audiolux/case-side.jpg';

/* vmatrix images */
import vmatrixFallingDot from './img/vmatrix/vmatrix-falling-dot.jpg';


const styles = {
    paragraph: {
        marginBottom: 30,
    },
    caption: {
        fontStyle: 'italic',
        marginBottom: 30,
    },
    image: {
        width: '100%',
    }
};

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
    // }, {
    //     slug: 'jukebox',
    //     component: 'Jukebox',
    //     image: 'https://picsum.photos/800/335',
    //     title: 'Jukebox',
    //     description: 'Crowd-sourced Spotify playlists.',
    //     url: 'https://www.google.com/',
    //     width: 800,
    //     height: 335,
    // {
    //     slug: 'semio',
    //     component: 'Semio',
    //     image: 'https://picsum.photos/800/345',
    //     title: 'Semio',
    //     description: 'Seizure onset zone probability calculator.',
    //     url: 'https://www.google.com/',
    //     width: 800,
    //     height: 345,
    // },
];

export const VMatrix = (props) => (
    <div>
        <Typography style={styles.paragraph}>
            <b>vmatrix</b> is an interactive audio visualizer, written in C, that runs on a Raspberry Pi 3 and displays audio visualizations on an RGB LED matrix.
        </Typography>

        <Typography style={styles.paragraph}>
            It is currently in active development. The code is <Link external href='https://github.com/benshanahan1/vmatrix' text='available on GitHub' /> and here are some <Link external href='https://drive.google.com/drive/u/1/folders/1-5Ad2uvUaU7FSPwE7hDFrsoWIoqni-wP' text='pictures and videos' /> of it in action!
        </Typography>
    </div>
);

export const OpenRocketryInitiative = (props) => (
    <div>
        <Typography component='div' style={styles.paragraph}>
            The Open Rocketry Initiative (ORI) is an attempt to make experimental rocketry more accessible. Implementing rocket control, automatic chute deployment, and real-time systems monitoring is a complex task, and ORI provides a codebase to give open-source users the chance to explore an implementation of a real-time control system. The CAD designs for the rocket components (e.g. tube couplers, blast cap, nose cone, tail fin) are also available online. ORI consists of three simultaneous efforts:

            <ul>
                <li><strong>Smart launchpad</strong> &mdash; trigger launch over WiFi and measure motor thrust curves (<Link external href='https://github.com/openrocketryinitiative/launchpad' text='repo' />)</li>
                <li><strong>Motors</strong> &mdash; optimize rocket motor thrust curves by adjusting fuel mixtures (<Link external href='https://github.com/openrocketryinitiative/motors' text='repo' />)</li>
                <li><strong>Rocket flight computer</strong> &mdash; measure real-time rocket position and control chute deployment (<Link external href='https://github.com/openrocketryinitiative/carlson' text='repo' />)</li>
            </ul>
        </Typography>

        <img src={launchpad} alt='Smart launchpad' style={styles.image} />
        <Typography style={styles.caption}>
            The smart launchpad with a motor attached, ready for testing.
        </Typography>

        <img src={clearMotor} alt='Clear rocket motor' style={styles.image} />
        <Typography style={styles.caption}>
            A rocket motor built with clear PVC tube allows observation of the internal combustion.
        </Typography>

        <Typography style={styles.paragraph}>
            I lead development of the rocket flight computer, lovingly nicknamed Carlson. Sporting a Raspberry Pi Zero W, Carlson is built and programmed to monitor real-time rocket orientation during flight. Carlson has a 10-DOF MPU9255 inertial monitoring unit that includes an accelerometer, gyroscope, magnetometer, and barometer. A telemetry radio enables communication with the rocket while in flight. The ORI team has successfully deployed Carlson in numerous launches and the collected orientation data permitted the development of a real-time apogee-detection algorithm.
        </Typography>

        <img src={carlsonHousingCanards} alt='Carlson housing' style={styles.image} />
        <Typography style={styles.caption}>
            Carlson, the rocket flight computer, installed in the 3D printed nose-cone of the rocket. The canards (black fins on the left) attach to the servo motors in the yellow housing.
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

export const Lunadrop = (props) => (
    <div>
        <Typography style={styles.paragraph}>
            Lunadrop is a user-friendly autonomous drone delivery system. I worked on this project with a team initially as a DIY-type project, but it turned into a larger endeavor over the course of the semester. In addition to building a drone capable of carrying packages up to 1 kilo for ~20-25 minutes, we needed to write code that interacted with the drone's onboard flight controller, a RESTful web API, and a user-friendly web app. To  communicate with the drone in-flight, we equipped it with an LTE antenna and sim card for internet connectivity.
        </Typography>

        <img src={quadCloseup} alt='Quadcopter, close-up' style={styles.image} />
        <Typography style={styles.caption}>
            Close-up of the first lunadrop drone prototype. In addition to the flight computer's IMU, the drone has telemetry, GPS, and an LTE modem with a sim card for 3G internet connectivity.
        </Typography>

        <Typography style={styles.paragraph}>
            I developed the server back-end and the website itself. The back-end was a Python Flask web application running on Amazon AWS. The database stored information about real-time drone position (coordinates, velocity, altitude, battery voltage). Additionally, there was a separate process that coordinated multiple drones, assigning them deliveries based on their remaining battery level. The front-end needed to be mobile-friendly, and needed to poll the server to display the drones' positions in real-time on an interface similar to Google Maps.
        </Typography>

        <img src={esc4in1} alt='4-in-1 ESC' style={styles.image} />
        <Typography style={styles.caption}>
            The 4-in-1 electronic speed controller (ESC) module that we used on the initial lunadrop drone prototype.
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

export const Jukebox = (props) => (
    <Typography style={styles.paragraph}>Jukebox</Typography>
);

export const Audiolux = (props) => (
    <div>

        <Typography style={styles.paragraph}>
            Audiolux is a real-time audio-synchronized lightshow. A Teensy microcontroller is the brain of the system, calculating a fast-fourier transform in real-time to allow visualization of the different frequency components of an incoming audio stream.
        </Typography>

        <img src={caseSide} alt='Case side-view' style={styles.image} />
        <Typography style={styles.caption}>
            Side-view of the Audiolux case. Switches allow user to turn LED-strips on and off.
        </Typography>

        <Typography style={styles.paragraph}>
            The original Audiolux system was built as a project for an art class. For the upgraded version, I bought a faster microprocessor (Teensy) that could run a small real-time FFT onboard. This allows for visualization of the frequency spectrum of the incoming audio instead of just amplitude.
        </Typography>
        
        <Typography style={styles.paragraph}>
            Audiolux reads incoming audio as an analog input on the microprocess, then runs a real-time 1024 point FFT algorithm on the audio. It bins the FFT output logarithmically into 16 bins and assigns each a color based on its number. The result is a hypnotizing audio-synchronized lightshow.
        </Typography>
        
        <Typography style={styles.paragraph}>
            Two longer strips act as "bass visualizers": a pulse of light shoots down them whenever the lowest FFT bin passes a certain predefined threshold.
        </Typography>

        <Typography style={styles.paragraph}>
            More pictures can be found <Link external text='here' href='https://drive.google.com/drive/u/0/folders/0B0o_ibOPs__CRDcxNHRzSUI5RW8' />.
        </Typography>

        <YouTube
            videoId='jn_87JqG4mw'
            opts={{
                width: '100%',
                height: props.dimensions.isMobile ? 200 : 500,
            }}
        />

    </div>
);

export const Semio = (props) => (
    <Typography style={styles.paragraph}>Semio</Typography>
);

export function getComponent(project, dimensions) {
    switch (project.component) {
        case 'VMatrix':
            return <VMatrix project={project} dimensions={dimensions} />;
        case 'OpenRocketryInitiative':
            return <OpenRocketryInitiative project={project} dimensions={dimensions} />;
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
