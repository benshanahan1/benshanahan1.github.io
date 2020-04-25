import React from "react";
import PropTypes from "prop-types";
import "../styles/SocialIcon.css"; // eslint-disable-line

function SocialIcon(props) {
  const { imgSrc, altText } = props;
  return (
    <div className="socialIconWrapper">
      <img className="socialIconImage" src={imgSrc} alt={altText} />
    </div>
  );
}

SocialIcon.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

SocialIcon.defaultProps = {
  altText: "",
};

export default SocialIcon;
