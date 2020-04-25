import React from "react";
import YouTube from "react-youtube";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import caseSide from "../../assets/img/audiolux/case-side.jpg";
import "./style.css";

export default function Audiolux(props) {
  return (
    <div>
      <Typography className="paragraph">
        Audiolux is a real-time audio-synchronized lightshow. A Teensy
        microcontroller is the brain of the system, calculating a fast-fourier
        transform in real-time to allow visualization of the different frequency
        components of an incoming audio stream.
      </Typography>
      <img src={caseSide} alt="Case side-view" className="image" />
      <Typography className="caption">
        Side-view of the Audiolux case. Switches allow user to turn LED-strips
        on and off.
      </Typography>
      <Typography className="paragraph">
        The original Audiolux system was built as a project for an art class.
        For the upgraded version, I bought a faster microprocessor (Teensy) that
        could run a small real-time FFT onboard. This allows for visualization
        of the frequency spectrum of the incoming audio instead of just
        amplitude.
      </Typography>
      <Typography className="paragraph">
        Audiolux reads incoming audio as an analog input on the microprocess,
        then runs a real-time 1024 point FFT algorithm on the audio. It bins the
        FFT output logarithmically into 16 bins and assigns each a color based
        on its number. The result is a hypnotizing audio-synchronized lightshow.
      </Typography>
      <Typography className="paragraph">
        Two longer strips act as &ldquo;bass visualizers&rdquo;: a pulse of
        light shoots down them whenever the lowest FFT bin passes a certain
        predefined threshold.
      </Typography>
      <Typography className="paragraph">
        More pictures can be found{" "}
        <Link
          external
          text="here"
          href="https://drive.google.com/drive/u/0/folders/0B0o_ibOPs__CRDcxNHRzSUI5RW8"
        />
        .
      </Typography>
      <YouTube
        videoId="jn_87JqG4mw"
        opts={{
          width: "100%",
          height: props.dimensions.isMobile ? 200 : 500, // eslint-disable-line
        }}
      />
    </div>
  );
}
