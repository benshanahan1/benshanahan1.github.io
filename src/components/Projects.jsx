import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ProjectDisplay from "./ProjectDisplay";
import { projects } from "./projects/index";

function Projects(props) {
  const { dimensions } = props;

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        paddingTop: 10,
      }}
    >
      <div style={{ paddingBottom: 25 }}>
        <Typography variant="h5">Projects</Typography>
        <Typography>
          I like to build things in my free time. Click to learn more.
        </Typography>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {projects.map((project) => (
          <ProjectDisplay
            key={project.title}
            project={project}
            dimensions={dimensions}
          />
        ))}
      </div>
    </div>
  );
}

Projects.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Projects;
