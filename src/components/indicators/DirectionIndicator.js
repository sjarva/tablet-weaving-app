import React from 'react';

const DirectionIndicator = ({c, r, direction, directionChange}) => {
    return <div className={`grid-item__centered grid-item-${c}-${r}`} onClick={directionChange}>
        <div>{direction === 'forward' ? '/' : '\\'} </div>
    </div>;

}

export default DirectionIndicator;