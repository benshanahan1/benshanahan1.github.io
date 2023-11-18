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
            <b>Hi, I'm Benjamin! </b>
            Back in March 2023, I co-founded <Link external text="Senra Systems" href="https://www.senrasystems.us">
              Senra Systems
            </Link> with <Link external text="Jordan Black" href="https://www.linkedin.com/in/jordan-black-138419a1/">Jordan Black</Link>.
            As former <Link external text="SpaceX" href="https://www.spacex.com">SpaceX</Link> engineers, we both set out to build the world's first software-powered <Link external text="wire harness" href="https://en.wikipedia.org/wiki/Cable_harness">wire harness</Link> manufacturing company,
            aiming to solve the very real problems that we experienced first-hand at the rocket factory. Torrance News did a segment on us, <Link external text="Torrance News segment" href="https://www.youtube.com/watch?v=JnJU7T5Ofq8">check it out here</Link>.
          </Typography>
          <br />
          <Typography>
            In my previous life as a SpaceX software engineer, I primarily working on{' '}
            <Link external text="home grown manufacturing software and execution systems" href="https://stackoverflow.blog/2021/05/13/building-the-software-that-helps-build-spacex/">
              home grown manufacturing software and execution systems
            </Link>
            {' '}and briefly on the massive telemetry system that collects and ingests data from rocket launches, engine test beds, and Starlink satellites. 
          </Typography>
          <br />
          <Typography>
            Before Aerospace, I worked at{" "}
            <Link external text="NeuroPace" href="https://www.neuropace.com/" />
            , a medical device company in Mountain View, CA that manufactures a{" "}
            <Link
              external
              text="responsive neurostimulation system"
              href="https://www.neuropace.com/the-rns-system/"
            />{" "}
            for treating epilepsy in patients unresponsive to anti-seizure
            medication. I also worked for several years in the{' '}
            <Link external text="BrainGate brain-computer interface lab" href="https://www.braingate.org/">
            BrainGate brain-computer interface lab
            </Link>
            {' '}at my Alma Mater, Brown University.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
