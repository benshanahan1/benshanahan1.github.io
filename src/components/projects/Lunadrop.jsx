import React from 'react';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import esc4in1 from '../../assets/img/lunadrop/esc-4in1.jpg';
import quadCloseup from '../../assets/img/lunadrop/quad-closeup.jpg';
import './style.css';


export default function Lunadrop(props) {
  return (
    <div>
      <Typography className="paragraph">
        Lunadrop is a user-friendly autonomous drone delivery system. I worked on
        this project with a team initially as a DIY-type project, but it turned
        into a larger endeavor over the course of the semester. In addition to
        building a drone capable of carrying packages up to 1 kilo for ~20-25
        minutes, we needed to write code that interacted with the drone&apos;s onboard
        flight controller, a RESTful web API, and a user-friendly web app. To
        communicate with the drone in-flight, we equipped it with an LTE antenna and
        sim card for internet connectivity.
      </Typography>
      <img src={quadCloseup} alt="Quadcopter, close-up" className="image" />
      <Typography className="caption">
        Close-up of the first lunadrop drone prototype. In addition to the flight
        computer&apos;s IMU, the drone has telemetry, GPS, and an LTE modem with a sim
        card for 3G internet connectivity.
      </Typography>
      <Typography className="paragraph">
        I developed the server back-end and the website itself. The back-end was
        a Python Flask web application running on Amazon AWS. The database stored
        information about real-time drone position (coordinates, velocity,
        altitude, battery voltage). Additionally, there was a separate process
        that coordinated multiple drones, assigning them deliveries based on
        their remaining battery level. The front-end needed to be mobile-friendly,
        and needed to poll the server to display the drones&rsquo; positions in real-time
        on an interface similar to Google Maps.
      </Typography>
      <img src={esc4in1} alt="4-in-1 ESC" className="image" />
      <Typography className="caption">
        The 4-in-1 electronic speed controller (ESC) module that we used on the
        initial lunadrop drone prototype.
      </Typography>
      <Typography className="paragraph">
        We held several meetings with the University department of public safety
        to plan a live demonstration of Lunadrop delivery in action. For safety,
        we were required to fly above buildings as much as possible (instead of
        point-to-point), so we implemented the ability to upload a waypoint path
        to each drone prior to takeoff. Unfortunately, due to time constraints,
        we were never able to hold a live demo, but we did test the system
        multiple times in a safe area.
      </Typography>
      <Typography className="paragraph">
        The full source can be found
        {' '}
        <Link external href="https://github.com/IzzyBrand/dro.ne" text="here" />
        . My work on the web application and server back-end can be found in its
        most updated form
        {' '}
        <Link external href="https://github.com/benshanahan1/dronesvr" text="here" />
        .
      </Typography>
      <Typography className="paragraph">
        To publicize the planned live demo and to inform about Lunadrop, we
        created a brief teaser video:
      </Typography>
      <YouTube
        videoId="Rt-q0L54g0c"
        opts={{
          width: '100%',
          height: props.dimensions.isMobile ? 200 : 500,  // eslint-disable-line
        }}
      />
    </div>
  );
}
