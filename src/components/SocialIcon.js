import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SocialIcon.css';

function SocialIcon(props) {
    const { imgSrc, altText } = props;
    return (
        <div className='socialIconWrapper'>
            <img
                className='socialIconImage'
                src={imgSrc}
                alt={altText}
            />
        </div>
    );
}

SocialIcon.propTypes = {
    type: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    altText: PropTypes.string,
};

SocialIcon.defaultProps = {
    altText: '',
};

export default SocialIcon;