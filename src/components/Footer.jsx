import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div style={{ textAlign: "center", marginBottom: 10 }}>
      <Typography>
        Copyright{" "}
        <span role="img" aria-label="Rocket emoji">
          🚀
        </span>{" "}
        {year} Benjamin Shanahan.{" "}
        <Link
          external
          href="https://github.com/benshanahan1/benshanahan1.github.io"
          text="View source"
        />
        .
      </Typography>
    </div>
  );
}

export default Footer;
