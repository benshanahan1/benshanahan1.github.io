import React from 'react';
import Typography from '@material-ui/core/Typography';
import ProjectDisplay from './ProjectDisplay';
import { projects } from '../assets/projects';

function Projects(props) {
    return (
        <div
            style={{
                paddingTop: 25,
                textAlign: 'center',
                width: '100%',
            }}
        >
            <div style={{ paddingBottom: 25 }}>
                <Typography variant='h4'>Projects</Typography>
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
                        image={project.image}
                        slug={project.slug}
                        title={project.title}
                        description={project.description}
                        url={project.url}
                        width={project.width}
                        height={project.height}
                        dimensions={props.dimensions}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;