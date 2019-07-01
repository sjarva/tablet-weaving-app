import React from 'react';
import EditColorsButton from './EditColorsButton';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleEdgeChange = this.handleEdgeChange.bind(this);
    }

    handleWidthChange(e) {
        console.log('inputted value is ', e.target.value);
        this.props.handleWidht(e.target.value);
    }

    handleHeightChange(e) {
        console.log('inputted value is ', e.target.value);
        this.props.handleHeight(e.target.value);
    }
    handleEdgeChange(e) {
        this.props.handleEdge(e.target.value);
    }

    render() {
        return <div className="grid-item-settings">
            <label>
                Mallikerran leveys:
                <input value={this.props.width} onChange={this.handleWidthChange}></input>
            </label>
            <label>
                Mallikerran korkeus:
                <input value={this.props.height} onChange={this.handleHeightChange}></input>
            </label>
            <label>
                Reunasilmukoiden määrä:
                <input value={this.props.nmbOfEdgeSts} onChange={this.handleEdgeChange}></input>
            </label>
            <EditColorsButton></EditColorsButton>
        </div>;
    }
}