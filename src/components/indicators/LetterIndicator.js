import React from 'react';

const LetterIndicator = ({letter, c, r}) => {
    return <div className={`grid-item-${c}-${r} grid-item__centered letter-indicator-js`}>
        {letter}
    </div>
}

export default LetterIndicator;
