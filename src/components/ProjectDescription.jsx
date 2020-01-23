import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';
import DocumentTitle from 'react-document-title';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SourceCodeIcon from '@material-ui/icons/OpenInNew';
import { projects, getComponent } from './projects';
import ProjectDisplay from './ProjectDisplay';
import './ProjectDescription.css';


function BackButton(props) {
  const { isFixed } = props;
  return (
    <Button
      className={clsx(isFixed && 'back-button', !isFixed && 'back-button-mobile')}
      component={Link}
      to="/"
    >
      Back to home
    </Button>
  );
}

BackButton.propTypes = {
  isFixed: PropTypes.bool,
};

BackButton.defaultProps = {
  isFixed: false,
};


function ProjectDescription(props) {
  const { dimensions, match } = props;
  const { isMobile } = dimensions;
  const { slug } = match.params;
  const project = _.find(projects, obj => slug === obj.slug);

  if (!project) {
    return <Redirect to="/" />;
  }

  return (
    <DocumentTitle title={project.title}>
      <div className="project-container">
        { !isMobile && <BackButton isFixed={!isMobile} /> }
        <Typography component="div" variant={isMobile ? 'h5' : 'h4'}>
          { project.title }
          <div className="project-source-icon">
            <Tooltip title="View project repo" placement="right">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <SourceCodeIcon />
              </a>
            </Tooltip>
          </div>
        </Typography>
        <div className="project-header-image">
          <ProjectDisplay
            noLink
            noTitle
            project={project}
            dimensions={dimensions}
          />
        </div>
        <div className={clsx('project-component-container', isMobile && 'project-component-padding')}>
          { getComponent(project, dimensions) }
        </div>
        <BackButton />
      </div>
    </DocumentTitle>
  );
}

ProjectDescription.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,  // eslint-disable-line
};


export default ProjectDescription;
