import React from 'react';
import _ from 'lodash';
import { Redirect, Link } from 'react-router-dom';
import { projects, getComponent } from '../assets/projects';

import Button from '@material-ui/core/Button';

/* Modify project descriptions in 'src/assets/projects.js'. */

function ProjectDescription(props) {
    const { slug } = props.match.params;
    const project = _.find(projects,
                           obj => { return slug === obj.slug });

    if (!project) {
        return <Redirect to='/' />;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    textAlign: 'justify',
                    display: 'inline-block',
                    width: 800,
                    minHeight: '80vh'
                }}
            >
                { getComponent(project) }
            </div>
            <div>
                <Button
                    component={Link}
                    to='/'
                    style={{ marginTop: 30 }}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

export default ProjectDescription;
