import React from 'react';
import './Stitch.scss';

const Stitch = ({color, status, c, r, againstMasterDir}) => {
        return <div className={`stitch stitch__${againstMasterDir ? 'against': 'along'}`}>
            <div className={`oval oval__${status}`} style={{backgroundColor: color}}></div>
        </div>;
};

export default Stitch;