import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";
import cvPDF from "../assets/pdf/ShanahanBenjaminCV.pdf";

function Header(props) {
  const { dimensions } = props;
  const { isMobile } = dimensions;

  return (
    <div
      style={{
        paddingTop: isMobile ? 5 : 25,
        paddingBottom: 20,
        textAlign: "center",
      }}
    >
      <Typography variant={isMobile ? "h4" : "h3"}>
        Benjamin Shanahan
      </Typography>
      <Typography>
        benshanahan1 (at) gmail &nbsp;//&nbsp;
        <Link external text="cv" href={cvPDF} />
        &nbsp;//&nbsp;
        <Link external text="github" href="https://github.com/benshanahan1" />
        &nbsp;//&nbsp;
        <Link
          external
          text="linkedin"
          href="https://www.linkedin.com/in/benshanahan/"
        />
      </Typography>
    </div>
  );
}

Header.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Header;
