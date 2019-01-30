import React from 'react';
import Typography from '@material-ui/core/Typography';
import ProjectDisplay from './ProjectDisplay';
import { projects } from '../assets/projects';

function Projects(props) {
    return (
        <div
            style={{
                textAlign: 'center',
                width: '100%',
                paddingTop: 10,
            }}
        >
            <div style={{ paddingBottom: 25 }}>
                <Typography variant='h5'>Projects</Typography>
                <Typography>Things that I've built. Click to learn more.</Typography>
            </div>
            <div
                style={{
                    textAlign: 'center',
                }}
            >
                { projects.map(project => (
                    <ProjectDisplay
                        key={project.title}
                        project={project}
                        dimensions={props.dimensions}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;