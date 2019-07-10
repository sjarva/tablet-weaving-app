import React from 'react';
import './Stitch.scss';

const Stitch = ({color, status, c, r, againstMasterDir, isDouble, doubleColor}) => {
        return <div className={`stitch stitch__${againstMasterDir ? 'against': 'along'}`}>
            {isDouble && 
                <div className={`oval oval__${status}`} style={{backgroundColor: doubleColor}}>
                    <div className={`double-oval double-oval__${status}`} style={{backgroundColor: color}}></div>
                </div>
            }

            {!isDouble && 
            <div className={`oval oval__${status}`} style={{backgroundColor: color}}>
            </div>
            }
        </div>;
};

export default Stitch;