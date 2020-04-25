import React from "react";
import PropTypes from "prop-types";
import "./Link.css";

function Link(props) {
  const { href, text, external, children, ...rest } = props;

  // Specify link target
  let target = "_self";
  if (external) {
    target = "_blank";
  }

  return (
    <a href={href} target={target} {...rest}>
      {children && children}
      {!children && text}
    </a>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.object, // eslint-disable-line
  external: PropTypes.bool,
};

Link.defaultProps = {
  children: null,
  external: true,
};

export default Link;
