import React from 'react';
import ClickableStitch from './ClickableStitch';
import MasterColumnContainer from './MasterColumnContainer';
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

    createModelSts() {
        const columnShift = this.state.columnShift;
        const rowShift = this.state.rowShift;
        const r = parseInt(this.props.r) + rowShift;
        const c = parseInt(this.props.c) + columnShift;
        
        const nmbOfEdgeSts = parseInt(this.props.nmbOfEdgeSts) + columnShift;
        const showEdgeSts = this.props.showEdgeSts;
        const modelSts = [];
        
        
        // Model stitches
        for (let ri = r; ri > rowShift; ri--) {
            for (let ci = columnShift; ci < c; ci++){
                if((ci < nmbOfEdgeSts || ci > c - nmbOfEdgeSts + columnShift -1))  {
                    if (showEdgeSts) {
                        modelSts.push({key: ('' + ci + '0' + ri), c: ci, r: ri});
                    }
                }
                else {
                    modelSts.push({key: ('' + ci + '0' + ri), c: ci, r: ri});
                }
            }
        }

        return modelSts;
    }

    render() {
        return (<React.Fragment>
            
            <MasterColumnContainer c={this.props.c} r={this.props.r}
            columnShift={this.state.columnShift} rowShift={this.state.rowShift} numberOfMasterRows={this.state.numberOfMasterRows}></MasterColumnContainer>
            
            {this.createModelSts().map((st) => {
                return <ClickableStitch key={st.key} c={st.c} r={st.r}></ClickableStitch>
            })}
        </React.Fragment>);
    }

}

PatternContainer.propTypes = {
    c: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    showEdgeSts: PropTypes.bool.isRequired,
    nmbOfEdgeSts: PropTypes.number.isRequired,
}