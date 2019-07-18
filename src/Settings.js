import React from "react";
import PropTypes from 'prop-types';
import ColorPanel from "./ColorPanel";
import "./Settings.scss";
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleEdgeChange = this.handleEdgeChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleWidthChange(e) {
    this.props.handleWidht(e.target.value);
  }

  handleHeightChange(e) {
    this.props.handleHeight(e.target.value);
  }
  handleEdgeChange(e) {
    this.props.handleEdge(e.target.value);
  }

  handleColorChange(color, index) {
    this.props.handleColor(color, index);
  }

  render() {
    return (
      <div className="grid-item-settings">
        <div className="settings-width">
          <label>
            Mallikerran leveys:
            <input value={this.props.width} onChange={this.handleWidthChange} />
          </label>
        </div>
        <div className="settings-height">
          <label>
            Mallikerran korkeus:
            <input
              value={this.props.height}
              onChange={this.handleHeightChange}
            />
          </label>
        </div>
        <div className="settings-edges">
          <label>
            Reunasilmukoiden määrä:
            <input
              value={this.props.nmbOfEdgeSts}
              onChange={this.handleEdgeChange}
            />
          </label>
        </div>
        <div className="settings-colors">
          <label>Väripaletti:</label>
          <ColorPanel colors={this.props.colorPalette} handleChange={this.handleColorChange}></ColorPanel>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    nmbOfEdgeSts: PropTypes.number.isRequired,
    colorPalette: PropTypes.array.isRequired,
    handleWidht: PropTypes.func.isRequired,
    handleHeight: PropTypes.func.isRequired,
    handleEdge: PropTypes.func.isRequired,
    handleColor: PropTypes.func.isRequired,
}
