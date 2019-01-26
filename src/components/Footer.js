import React from 'react';
import Typography from '@material-ui/core/Typography';

function Footer(props) {
    const year = new Date().getFullYear();

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography>
                Copyright &copy; {year} Benjamin Shanahan
            </Typography>
        </div>
    );
}

export default Footer;
