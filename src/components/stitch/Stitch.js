import React from 'react';
import './Stitch.scss';

const Stitch = ({color, status, c, r, againstMasterDir, isDouble, number}) => {
        return <div className={`stitch stitch__${againstMasterDir ? 'against': 'along'}`}>
            {isDouble &&
                <div className={`oval oval__${status}`}>
                    <div className={`double-oval double-oval__${status}`} style={{backgroundColor: color}}>
                    </div>
                </div>
            }

            {!isDouble &&
            <div className={`oval oval__${status}`} style={{backgroundColor: color}}>

            </div>
            }
        </div>;
};

export default Stitch;
