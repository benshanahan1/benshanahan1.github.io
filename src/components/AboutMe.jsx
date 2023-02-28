import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";
import me from "../assets/img/me.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <div className="profilePictureWrapper">
        <img src={me} alt="Me" className="profilePicture" />
      </div>
      <div className="aboutText">
        <div>
          <Typography>
            <b>Hi, I&apos;m Benjamin!</b> I&apos;m a software engineer working
            at{" "}
            <Link external text="SpaceX" href="https://www.spacex.com">
              SpaceX
            </Link>
            , an aerospace company focused on revolutionizing space
            transportation and making life interplanetary.
            {' '}I&apos;ve primarily worked on{' '}
            <Link external text="home grown manufacturing software and execution systems" href="https://stackoverflow.blog/2021/05/13/building-the-software-that-helps-build-spacex/">
              home grown manufacturing software and execution systems
            </Link>
            {' '}and briefly on the massive telemetry system that collects and ingests data from rocket launches, engine test beds, and Starlink satellites. 
          </Typography>
          <br />
          <Typography>
            Previously, I worked at{" "}
            <Link external text="NeuroPace" href="https://www.neuropace.com/" />
            , a medical device company in Mountain View, CA that manufactures a{" "}
            <Link
              external
              text="responsive neurostimulation system"
              href="https://www.neuropace.com/the-rns-system/"
            />{" "}
            for treating epilepsy in patients unresponsive to anti-seizure
            medication. Prior to industry, I worked for a couple of years in the{' '}
            <Link external text="BrainGate brain-computer interface lab" href="https://www.braingate.org/">
            BrainGate brain-computer interface lab
            </Link>
            {' '}at Brown University.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
