import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from './Link';

function Header(props) {
    const { dimensions } = props;
    const isMobile = dimensions.isMobile;

    return (
        <div
            style={{
                paddingTop: isMobile ? 5 : 25,
                paddingBottom: 30,
                textAlign: 'center',
            }}
        >
            <Typography variant={isMobile ? 'h4' : 'h2'}>
                Benjamin Shanahan
            </Typography>
            <Typography>
                benshanahan1 (at) gmail
                &nbsp;//&nbsp;
                <Link
                    external
                    text='cv'
                    href='#'
                />
                &nbsp;//&nbsp;
                <Link
                    external
                    text='github'
                    href='https://github.com/benshanahan1'
                />
            </Typography>
        </div>
    );
}

export default Header;