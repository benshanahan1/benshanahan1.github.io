import React from 'react';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import { Redirect, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { projects, getComponent } from '../assets/projects';
import ProjectDisplay from './ProjectDisplay';

/* Modify project descriptions in 'src/assets/projects.js'. */

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
    const { dimensions } = props;
    const isMobile = dimensions.isMobile;
    const { slug } = props.match.params;
    const project = _.find(projects,
                           obj => { return slug === obj.slug });

    const backButton = () => (
        <div style={isMobile ? styles.backButtonMobile : styles.backButton}>
            <Button component={Link} to='/'>
                Back to home
            </Button>
        </div>
    );

    if (!project) {
        return <Redirect to='/' />;
    }

    return (
        <DocumentTitle title={project.title}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                { !isMobile && backButton() }

                <Typography variant={isMobile ? 'h5' : 'h4'}>
                    { project.title }
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
                    { getComponent(project) }
                </div>

                { isMobile && backButton() }
            </div>
        </DocumentTitle>
    );
}

export default ProjectDescription;
