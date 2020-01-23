import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import './style.css';


export default function VMatrix() {
  return (
    <div>
      <Typography className="paragraph">
        <b>vmatrix</b>
        {' '}
        is an interactive audio visualizer, written in C, that runs on a
        Raspberry Pi 3 and displays audio visualizations on an RGB LED matrix.
      </Typography>
      <Typography className="paragraph">
        It is currently in active development. The code is
        {' '}
        <Link external href="https://github.com/benshanahan1/vmatrix" text="available on GitHub" />
        {' '}
        and here are some
        {' '}
        <Link external href="https://drive.google.com/drive/u/1/folders/1-5Ad2uvUaU7FSPwE7hDFrsoWIoqni-wP" text="pictures and videos" />
        {' '}
        of it in action!
      </Typography>
    </div>
  );
}
