import React from 'react';

const DirectionIndicator = ({c, r, direction, directionChange}) => {
    return <div className={`grid-item-${c}-${r} grid-item__centered`} onClick={directionChange}>
        {direction === 'forward' ? '/' : '\\'}
    </div>;

}

export default DirectionIndicator;