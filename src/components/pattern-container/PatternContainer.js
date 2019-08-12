import React from 'react';
import ColumnContainer from '../column-container/ColumnContainer';
import PropTypes from 'prop-types';

export default class PatternContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnShift: 3,
            rowShift: 4,
            numberOfMasterRows: 4,
        }
    }

    render() {
        return (
            <ColumnContainer
                c={this.props.c} r={this.props.r}
                columnShift={this.state.columnShift} rowShift={this.state.rowShift}
                numberOfMasterRows={this.state.numberOfMasterRows}
                nmbOfEdgeSts={this.props.nmbOfEdgeSts}
                showEdgeSts={this.props.showEdgeSts}
                colorPalette={this.props.colorPalette}
                ></ColumnContainer>
        );
    }

}

PatternContainer.propTypes = {
    c: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    showEdgeSts: PropTypes.bool.isRequired,
    nmbOfEdgeSts: PropTypes.number.isRequired,
    colorPalette: PropTypes.array.isRequired,
}
