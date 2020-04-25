import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import carlsonHousingCanards from "../../assets/img/ori/carlson-housing-w-canards.jpg";
import clearMotor from "../../assets/img/ori/clear-motor.jpg";
import launchpad from "../../assets/img/ori/launchpad.jpg";
import "./style.css";

export default function OpenRocketryInitiative() {
  return (
    <div>
      <Typography component="div" className="paragraph">
        The Open Rocketry Initiative (ORI) is an attempt to make experimental
        rocketry more accessible. Implementing rocket control, automatic chute
        deployment, and real-time systems monitoring is a complex task, and ORI
        provides a codebase to give open-source users the chance to explore an
        implementation of a real-time control system. The CAD designs for the
        rocket components (e.g. tube couplers, blast cap, nose cone, tail fin)
        are also available online. ORI consists of three simultaneous efforts:
        <ul>
          <li>
            <strong>Smart launchpad</strong> &mdash; trigger launch over WiFi
            and measure motor thrust curves (
            <Link
              external
              href="https://github.com/openrocketryinitiative/launchpad"
              text="repo"
            />
            )
          </li>
          <li>
            <strong>Motors</strong> &mdash; optimize rocket motor thrust curves
            by adjusting fuel mixtures (
            <Link
              external
              href="https://github.com/openrocketryinitiative/motors"
              text="repo"
            />
            )
          </li>
          <li>
            <strong>Rocket flight computer</strong> &mdash; measure real-time
            rocket position and control chute deployment (
            <Link
              external
              href="https://github.com/openrocketryinitiative/carlson"
              text="repo"
            />
            )
          </li>
        </ul>
      </Typography>
      <img src={launchpad} alt="Smart launchpad" className="image" />
      <Typography className="caption">
        The smart launchpad with a motor attached, ready for testing.
      </Typography>
      <img src={clearMotor} alt="Clear rocket motor" className="image" />
      <Typography className="caption">
        A rocket motor built with clear PVC tube allows observation of the
        internal combustion.
      </Typography>
      <Typography className="paragraph">
        I lead development of the rocket flight computer, lovingly nicknamed
        Carlson. Sporting a Raspberry Pi Zero W, Carlson is built and programmed
        to monitor real-time rocket orientation during flight. Carlson has a
        10-DOF MPU9255 inertial monitoring unit that includes an accelerometer,
        gyroscope, magnetometer, and barometer. A telemetry radio enables
        communication with the rocket while in flight. The ORI team has
        successfully deployed Carlson in numerous launches and the collected
        orientation data permitted the development of a real-time
        apogee-detection algorithm.
      </Typography>
      <img
        src={carlsonHousingCanards}
        alt="Carlson housing"
        className="image"
      />
      <Typography className="caption">
        Carlson, the rocket flight computer, installed in the 3D printed
        nose-cone of the rocket. The canards (black fins on the left) attach to
        the servo motors in the yellow housing.
      </Typography>
      <Typography className="paragraph">
        This algorithm first detects rocket freefall (zero acceleration across
        all three axes) and then looks for an angle of deviation of more than 90
        degrees from vertical. When these two conditions are met, indicating the
        rocket is falling downwards, the Raspberry Pi shorts a relay that heats
        some Nichrome wire, igniting the rocket&apos;s blast-cap and ejecting
        the parachute. Here&apos;s a video of the{" "}
        <Link
          external
          href="https://www.instagram.com/p/Bb0dSJujduq/"
          text="parachute being ejected"
        />
        .
      </Typography>
      <Typography className="paragraph">
        In June 2018, as recipients of the NASA Rhode Island Space Grant (RISG),
        the team had the opportunity to give a brief talk at the RISG Symposium
        in Providence, RI about our work on Carlson, along with the smart
        launchpad and motor testing. The slides are available on{" "}
        <Link
          external
          href="https://docs.google.com/presentation/d/1OxAxDKqtxr4odVjT6q38U2s4oX1R2K-lVKEJCeqgmxo/edit?usp=sharing"
          text="Google Slides"
        />
        .
      </Typography>
      <Typography className="paragraph">
        You can find additional photos and videos of ORI development on our{" "}
        <Link
          external
          href="https://www.instagram.com/openrocketryinitiative/"
          text="Instagram"
        />
        .
      </Typography>
    </div>
  );
}
