import React from 'react';
import LetterIndicator from './LetterIndicator';
import Column from './Column';

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

const shouldNormalStitchesBeShown = (c, ci, columnShift, nmbOfEdgeSts, showEdgeSts) => {
    if(ci < (nmbOfEdgeSts + columnShift) || ci > (c - nmbOfEdgeSts + columnShift - 1))  {
        if (showEdgeSts) {
            return true;
        }
        return false;
    }
    return true;
};

const createColumns = (c, r, columnShift, rowShift, numberOfMasterRows, nmbOfEdgeSts, showEdgeSts) => {
    // RI is the lowes row of the whole pattern
    const ri = parseInt(r) + rowShift + numberOfMasterRows;
    const columns = [];
    for (let ci = columnShift; ci < c + columnShift; ci++) {
        const showNormalStitches = shouldNormalStitchesBeShown(c, ci, columnShift, nmbOfEdgeSts, showEdgeSts);
        columns.push(<Column 
            key={'' + ci + '0' + ri}
            c={ci} r={ri}
            nmbMasterSts={numberOfMasterRows}
            rowShift = {rowShift}
            nmbOfEdgeSts={nmbOfEdgeSts}
            showNormalSts={showNormalStitches}
            ></Column>);
    }
    return columns;
}

const ColumnContainer = ({c, r, columnShift, rowShift, numberOfMasterRows, nmbOfEdgeSts, showEdgeSts}) => {
    return <React.Fragment>
        {createLetters(r, numberOfMasterRows, columnShift, rowShift)}
        {createColumns(c, r, columnShift, rowShift, numberOfMasterRows, nmbOfEdgeSts, showEdgeSts)}
    </React.Fragment>;
}

export default ColumnContainer;