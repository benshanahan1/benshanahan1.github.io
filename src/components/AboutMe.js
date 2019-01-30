import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from './Link';
import me from '../assets/img/me.png';
import '../styles/AboutMe.css';

function AboutMe(props) {
    return (
        <div
            style={{
                width: '100%',
                textAlign: 'center',
            }}
        >
            <div className='profilePictureWrapper'>
                <img src={me} alt='Me' className='profilePicture' />
            </div>
            <div className='aboutText'>
                <div>
                    <Typography>
                        <b>Hi, I'm Benjamin!</b> I work as a full-stack software developer at <Link external text='NeuroPace' href='https://www.neuropace.com/' />, a medical device company in Mountain View, CA that manufactures a <Link external text='responsive neurostimulation system' href='https://www.neuropace.com/the-rns-system/' /> for treating epilepsy in patients unresponsive to anti-seizure medication. I build things in my free time.
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;