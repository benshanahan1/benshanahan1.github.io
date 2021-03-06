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
            transportation and making life interplanetary. Previously, I was at{" "}
            <Link external text="NeuroPace" href="https://www.neuropace.com/" />
            , a medical device company in Mountain View, CA that manufactures a{" "}
            <Link
              external
              text="responsive neurostimulation system"
              href="https://www.neuropace.com/the-rns-system/"
            />{" "}
            for treating epilepsy in patients unresponsive to anti-seizure
            medication. I build things in my free time.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
