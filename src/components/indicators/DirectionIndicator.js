import React from 'react';

const DirectionIndicator = ({c, r, direction, directionChange}) => {
    return <div className={`grid-item__centered grid-item-${c}-${r} direction-indicator-js`} onClick={directionChange}>
        <div className="direction-js">{direction === 'forward' ? '/' : '\\'}</div>
    </div>;

}

export default DirectionIndicator;
