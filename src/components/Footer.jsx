import React from 'react';
import Typography from '@material-ui/core/Typography';


function Footer() {
  const year = new Date().getFullYear();

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography>
        Copyright
        {' '}
        <span role="img" aria-label="Rocket emoji">🚀</span>
        {' '}
        {year}
        {' '}
        Benjamin Shanahan
      </Typography>
    </div>
  );
}


export default Footer;
