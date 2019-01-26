import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { getScrollbarWidth } from '../utilities/misc';

class ProjectDisplay extends React.Component {
    state = {
        hover: false,
    };

    render() {
        const { hover } = this.state;
        const {
            slug,
            url,
            image,
            title,
            description,
            width,
            height,
            dimensions,
        } = this.props;

        const isMobile = dimensions.isMobile;
        const screenWidth = dimensions.width - getScrollbarWidth();

        // Compute image size for when screen dimensions change (on resize).
        const aspectRatio = width / height;
        const renderWidth = (width < screenWidth) ? width : screenWidth;
        const renderHeight = renderWidth / aspectRatio;

        return (
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: isMobile ? 10 : 30,
                }}
            >
                <Link
                    onMouseOver={() => this.setState({ hover: true })}
                    onMouseOut={() => this.setState({ hover: false })}
                    to={`/${slug}`}
                    style={{
                        display: 'inline-block',
                        width: renderWidth,
                        height: renderHeight,
                        cursor: 'pointer',
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <img
                            width='100%'
                            height='100%'
                            src={image}
                            alt={title}
                            style={{
                                opacity: hover || isMobile ? 1 : 0.75,
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                background: 'white',
                                opacity: 0.8,
                                height: 75,
                                width: '100%',
                                color: 'black',
                                borderTop: 'solid 3px pink'
                            }}
                        >
                            <Typography variant='h6'>
                                { title }
                            </Typography>
                            <Typography>
                                { description }
                            </Typography>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProjectDisplay;
