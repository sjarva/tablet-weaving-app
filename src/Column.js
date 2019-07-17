import React from 'react';
import DirectionIndicator from './DirectionIndicator';
import MasterStitch from './MasterStitch';
import ClickableStitch from './ClickableStitch';
import PropTypes from 'prop-types';

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.handleMasterStsDirectionChange = this.handleMasterStsDirectionChange.bind(this);
        this.handleMasterStsColorChange = this.handleMasterStsColorChange.bind(this);
        this.createDirectionIndicator = this.createDirectionIndicator.bind(this);

        this.createMasterStitches = this.createMasterStitches.bind(this);
        this.createNormalStitches = this.createNormalStitches.bind(this);

        this.initiateNormalStsState = this.initiateNormalStsState.bind(this);
        this.changeNormalStsState = this.changeNormalStsState.bind(this);
        this.changeOneStitchAfterOneClick = this.changeOneStitchAfterOneClick.bind(this);
        this.changeOneStitchAfterDoubleClick = this.changeOneStitchAfterDoubleClick.bind(this);
        
        this.getNextIndexAlongMastDir = this.getNextIndexAlongMastDir.bind(this);
        this.getNextIndexAgainstMastDir = this.getNextIndexAgainstMastDir.bind(this);

        this.getStitchBelow = this.getStitchBelow.bind(this);

        const defaultMasterDirection = 'forward';

        const normalSts = this.initiateNormalStsState(defaultMasterDirection);

        this.state = {
            masterStsIndeces: [0, 1, 2, 3],
            direction: defaultMasterDirection,
            stitchColors: ['#FFFFFF', '#8A2BE2', '#8A2BE2', '#FFFFFF'],
            normalSts: normalSts,
        }
    }

    initiateNormalStsState(defaultMasterDirection) {
        const rowShift = this.props.rowShift;
        const r = parseInt(this.props.r) - this.props.nmbMasterSts;
        const nmbMasterSts = this.props.nmbMasterSts;
        
        const normalSts = [];
        for (let ri = r; ri > rowShift; ri--){
            const index = ((r- ri) % nmbMasterSts);
            normalSts[ri] = {
                warpIndex: index,
                direction: defaultMasterDirection,
                againstMasterDir: false,
                isDouble: false,
            };
        }

        return normalSts;
    }

    changeWarpIndexToDouble(currentWarpIndex) {
        const nmbMasterSts = this.props.nmbMasterSts;
        return (currentWarpIndex < nmbMasterSts / 2) ? (currentWarpIndex + 2) : (currentWarpIndex - 2);
    }

    getNextIndexAlongMastDir(currentWarpIndex, sameMastDirAsStBelow) {
        let newWarpIndex = (currentWarpIndex === this.props.nmbMasterSts - 1) ? 0 : (currentWarpIndex + 1);
        return sameMastDirAsStBelow ? newWarpIndex : this.getNextIndexAgainstMastDir(newWarpIndex, true);
    }

    getNextIndexAgainstMastDir(currentWarpIndex, sameMastDirAsStBelow) {
        let newWarpIndex = (currentWarpIndex === 0) ? (this.props.nmbMasterSts - 1) : (currentWarpIndex - 1);
        return sameMastDirAsStBelow ? newWarpIndex : this.getNextIndexAlongMastDir(newWarpIndex, true);
    }

    getStitchBelow(stitchIndex) {
        let stitchBelow;
        // If the current stitch is the lowest of the pattern repeat, the stitch below is latest master stitch
        if (stitchIndex === (this.props.r - this.props.nmbMasterSts)) {
            stitchBelow = {againstMasterDir: false, direction: this.state.direction, warpIndex: this.state.masterStsIndeces[3]};
        }
        else {
            stitchBelow = this.state.normalSts[(stitchIndex + 1)];
        }
        return stitchBelow;
    }

    changeNormalStitchDirection(stitchIndex, shouldChangeMasterDir) {
        let currentStitch = this.state.normalSts[stitchIndex];
        let stitchBelow = this.getStitchBelow(stitchIndex);

        currentStitch.direction = currentStitch.direction === 'forward' ? 'backward' : 'forward';
        // Usually always shouldChangeMasterDir
        // Not true if we are changing the master direction of the whole column
        if (shouldChangeMasterDir) {
            currentStitch.againstMasterDir = currentStitch.againstMasterDir ? false : true;
        }

        // Done to all stitches when turning once
            const sameMastDirAsBelow = currentStitch.againstMasterDir === stitchBelow.againstMasterDir;
            const newWarpIndex = currentStitch.againstMasterDir ?
                this.getNextIndexAgainstMastDir(stitchBelow.warpIndex, sameMastDirAsBelow) : this.getNextIndexAlongMastDir(stitchBelow.warpIndex, sameMastDirAsBelow);
            currentStitch.warpIndex = newWarpIndex;

        // Double
        if (currentStitch.isDouble) {
            const sameMastDirAsBelow = currentStitch.againstMasterDir === stitchBelow.againstMasterDir;
            const newWarpIndex = currentStitch.againstMasterDir ?
                this.getNextIndexAgainstMastDir(stitchBelow.warpIndex, !sameMastDirAsBelow) : this.getNextIndexAlongMastDir(stitchBelow.warpIndex, !sameMastDirAsBelow);
            currentStitch.warpIndex = newWarpIndex;
        }
        
        return currentStitch;
    }

    changeNormalStitchIndex(stitchIndex, isNowDouble) {
        let currentStitch = this.state.normalSts[stitchIndex];
        let againstMasterDir = currentStitch.againstMasterDir;
        let newWarpIndex;
        if ((isNowDouble && againstMasterDir) || (!isNowDouble && !againstMasterDir)) {
            newWarpIndex = this.getNextIndexAgainstMastDir(currentStitch.warpIndex, true);
        }
        else {
            newWarpIndex = this.getNextIndexAlongMastDir(currentStitch.warpIndex, true);
        }
        currentStitch.warpIndex = newWarpIndex;
        return currentStitch;
    }


    changeNormalStsState(howManyTurns, stitchIndexR, shouldChangeMasterDir) {
        const rowShift = this.props.rowShift;
        let copy = [...this.state.normalSts];
        
        // Changing doubleness
        if (howManyTurns === 2) {
            let currentStitch = copy[stitchIndexR];
            // Changing doubleness
            currentStitch.isDouble = currentStitch.isDouble ? false : true;
            // Changing index
            currentStitch = this.changeNormalStitchIndex(stitchIndexR, currentStitch.isDouble);
            
            // Changes also other stitches' indeces, changing those
            let newStitch; 
            // Starting from above current stitch
            for (let ri = stitchIndexR - 1; ri > rowShift; ri--) {
                newStitch = this.changeNormalStitchIndex(ri, currentStitch.isDouble);
                copy[ri] = newStitch;
            }
        }
        
        // Just change forward to backward and other way round, affects all stitches above the current stitch
        if (howManyTurns === 1) {            
            let newStitch; 
            for (let ri = stitchIndexR; ri > rowShift; ri--) {
                newStitch = this.changeNormalStitchDirection(ri, shouldChangeMasterDir);
                copy[ri] = newStitch;
            }
        }
        this.setState({normalSts: copy});
        
    }

    changeAllStsStateAfterMasterDirChange() {
        const r = parseInt(this.props.r) - this.props.nmbMasterSts;
        this.changeNormalStsState(1, r, false);
    }

    changeOneStitchAfterOneClick(index) {
        this.changeNormalStsState(1, index, true);
    }

    changeOneStitchAfterDoubleClick(index) {
        this.changeNormalStsState(2, index, false);
    }

    handleMasterStsDirectionChange() {
        this.setState({direction: this.state.direction === 'forward' ? 'backward': 'forward'}, this.changeAllStsStateAfterMasterDirChange);
    }

    handleMasterStsColorChange(index, color) {
        this.setState({stitchColors: this.stitchColors[index] = color});
    }

    createDirectionIndicator() {
        return <DirectionIndicator c={this.props.c} r={this.props.r +1} 
        direction={this.state.direction} directionChange={this.handleMasterStsDirectionChange}></DirectionIndicator>
    }

    createMasterStitches() {
        const r = this.props.r;
        const c = this.props.c;
        const nmbMasterSts = this.props.nmbMasterSts;
        const masterSts = [];
        
        for (let ri = r; ri > r - nmbMasterSts; ri--) {
            let index = r - ri;
            masterSts.push(<MasterStitch 
                index={index} color={this.state.stitchColors[index]} 
                handleColorChange={this.handleMasterStsColorChange} 
                key={'' + c + '0' + ri} status={this.state.direction}
                c={c} r={ri}></MasterStitch>);
        }
        return masterSts;
    }

    createNormalStitches() {
        const rowShift = this.props.rowShift;
        const r = parseInt(this.props.r) - this.props.nmbMasterSts;
        const ci = parseInt(this.props.c);

        const showNormalSts = this.props.showNormalSts;
        const modelSts = [];
        
        for (let ri = r; ri > rowShift; ri--){
            const curSt = this.state.normalSts[ri];
            const color = this.state.stitchColors[curSt.warpIndex];

            if (showNormalSts) {
                modelSts.push(<ClickableStitch 
                    color={color}
                    key={'' + ci + '0' + ri}
                    c={ci} r={ri}
                    direction={curSt.direction}
                    againstMasterDir={curSt.againstMasterDir}
                    handleClick={this.changeOneStitchAfterOneClick}
                    handleDoubleClick={this.changeOneStitchAfterDoubleClick}
                    isDouble={curSt.isDouble}
                    number={curSt.warpIndex}
                ></ClickableStitch>);
            }
        }

        return modelSts;
    }

    render() {
        return <React.Fragment>
        {this.createDirectionIndicator()}
        {this.createMasterStitches()}
        {this.createNormalStitches()}
        </React.Fragment>
    }

}

Column.propTypes = {
    c: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    nmbMasterSts: PropTypes.number.isRequired,
    rowShift: PropTypes.number.isRequired,
    showNormalSts: PropTypes.bool.isRequired,
}