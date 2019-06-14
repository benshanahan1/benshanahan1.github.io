import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import { Redirect, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SourceCodeIcon from '@material-ui/icons/OpenInNew';

import { projects, getComponent } from '../assets/projects';
import ProjectDisplay from './ProjectDisplay';


/* NOTE: Modify project descriptions in 'src/assets/projects.js'. */


const styles = {
  headerImage: {
    marginTop: 15,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  backButtonMobile: {
    textAlign: 'center',
    marginBottom: 30,
  },
};


function ProjectDescription(props) {
  const { dimensions, match } = props;
  const { isMobile } = dimensions;
  const { slug } = match.params;
  const project = _.find(projects,
    obj => slug === obj.slug);

  const backButton = () => (
    <div style={isMobile ? styles.backButtonMobile : styles.backButton}>
      <Button component={Link} to="/">
                Back to home
      </Button>
    </div>
  );

  if (!project) {
    return <Redirect to="/" />;
  }

  return (
    <DocumentTitle title={project.title}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        { !isMobile && backButton() }

        <Typography component="div" variant={isMobile ? 'h5' : 'h4'}>
          { project.title }
          <div
            style={{
              display: 'inline-block',
              paddingLeft: 15,
            }}
          >
            <a href={project.url} target="_blank" rel="noopener noreferrer" title="View repo">
              <SourceCodeIcon />
            </a>
          </div>
        </Typography>

        <div style={styles.headerImage}>
          <ProjectDisplay
            noLink
            noTitle
            project={project}
            dimensions={dimensions}
          />
        </div>

        <div
          style={{
            textAlign: 'justify',
            display: 'inline-block',
            maxWidth: 800,
            marginBottom: 30,
            padding: isMobile ? 10 : 0,
          }}
        >
          { getComponent(project, dimensions) }
        </div>

        { isMobile && backButton() }
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
