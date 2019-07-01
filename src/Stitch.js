import React from 'react';
import './Stitch.scss';

const Stitch = ({color, status, c, r}) => {
        return <div className={`stitch stitch__${status}`}>
            <div className={`oval oval__${status}`} style={{backgroundColor: color}}></div>
        </div>;
};

export default Stitch;