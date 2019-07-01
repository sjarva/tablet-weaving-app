import React from 'react';
import LetterIndicator from './LetterIndicator';
import MasterColumn from './MasterColumn';

const createLetters = (rr, numberOfMasterRows, columnShift, rowShift) => {
    const r = parseInt(rr) + rowShift;
    const ci = columnShift - 1;
    const lts = ['A', 'B', 'C', 'D'];
    const letters = [];
    // Letters for master sts
    for (let ri = r + numberOfMasterRows; ri > r; ri--) {
        const index = (r+numberOfMasterRows-ri);
        letters.push(<LetterIndicator key={ri} letter={lts[index]} c={ci} r={ri}></LetterIndicator>);
    }
    return letters;
};

const createMasterColumns = (c, rr, columnShift, rowShift, numberOfMasterRows) => {
    const r = parseInt(rr) + rowShift + numberOfMasterRows;
    const columns = [];
    for (let ci = columnShift; ci < c + columnShift; ci++) {
        columns.push(<MasterColumn key={'' + ci + '0' + r} c={ci} r={r} nmbMasterSts={numberOfMasterRows}></MasterColumn>);
    }
    return columns;
}

const MasterColumnContainer = ({c, r, columnShift, rowShift, numberOfMasterRows}) => {
    return <React.Fragment>
        {createLetters(r, numberOfMasterRows, columnShift, rowShift)}
        {createMasterColumns(c, r, columnShift, rowShift, numberOfMasterRows)}
        {/*old stuff createMasterSts(r, c, columnShift, rowShift, numberOfMasterRows)*/}
    </React.Fragment>;
}

export default MasterColumnContainer;