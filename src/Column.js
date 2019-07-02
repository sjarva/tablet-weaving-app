import React from 'react';
import DirectionIndicator from './DirectionIndicator';
import MasterStitch from './MasterStitch';
import ClickableStitch from './ClickableStitch';
import PropTypes from 'prop-types';

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.handleDirectionChange = this.handleDirectionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.createDirectionIndicator = this.createDirectionIndicator.bind(this);
        this.createMasterStitches = this.createMasterStitches.bind(this);
        this.createNormalStitches = this.createNormalStitches.bind(this);
        this.state = {
            direction: 'forward',
            stitchColors: ['#FF5733', '#D2B4DE', '#82E0AA', '#F7DC6F'],
        }
    }

    handleDirectionChange() {
        console.log('Changing direction of the master column');
        this.setState({direction: this.state.direction === 'forward' ? 'backward': 'forward'});
    }

    handleColorChange(index, color) {
        console.log('handleColorChange, index is ', index);
        console.log('color is ', color);
        this.setState({stitchColors: this.stitchColors[index] = color});
    }

    createDirectionIndicator() {
        return <DirectionIndicator c={this.props.c} r={this.props.r +1} 
        direction={this.state.direction} directionChange={this.handleDirectionChange}></DirectionIndicator>
    }

    createMasterStitches() {
        const r = this.props.r;
        const c = this.props.c;
        const nmbMasterSts = this.props.nmbMasterSts;
        const masterSts = [];
        
        for (let ri = r; ri > r - nmbMasterSts; ri--) {
            /* console.log('ri is ', ri);
            console.log('ri - nmbMasterSts ', ri - nmbMasterSts);
            console.log('nmbMasterSts is ', nmbMasterSts);
            console.log('r - ri ', r - ri); */
            let index = r - ri;
            masterSts.push(<MasterStitch 
                index={index} color={this.state.stitchColors[index]} 
                handleColorChange={this.handleColorChange} 
                key={'' + c + '0' + ri} status={this.state.direction}
                c={c} r={ri}></MasterStitch>);
        }
        return masterSts;
    }

    // Pastettu PatternContainerista, luvut menee sekaisin muokkauksien takia

    createNormalStitches() {
        const rowShift = this.props.rowShift;
        const r = parseInt(this.props.r) - this.props.nmbMasterSts;
        const ci = parseInt(this.props.c);

        const showNormalSts = this.props.showNormalSts;
        const modelSts = [];
        const nmbMasterSts = this.props.nmbMasterSts;
        
        // Model stitches
            for (let ri = r; ri > rowShift; ri--){
                // Count index so that a stitch knows what color to ask
                const index = ((r- ri) % nmbMasterSts);
                const color = this.state.stitchColors[index];
                if (showNormalSts) {
                    //console.log('creating a stitch with ', ci, ri);
                    modelSts.push( <ClickableStitch 
                        color={color} 
                        key={('' + ci + '0' + ri)}
                        c={ci} r={ri}
                        parentDirection={this.state.direction}
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