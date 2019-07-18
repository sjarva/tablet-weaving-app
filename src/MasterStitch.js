import React from "react";
import Stitch from "./Stitch";
import PropTypes from "prop-types";
import { GithubPicker } from "react-color";

export default class MasterStitch extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      displayColorPicker: false
    };
  }

  // Color change
  handleChange(color) {
      this.props.handleColorChange(this.props.index, color.hex);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  render() {
    return (
      <div
        className={`grid-item grid-item-${this.props.c}-${this.props.r}`}
        onClick={this.handleClick}
      >
        <Stitch
          color={this.props.color}
          status={this.props.status}
          c={this.props.c}
          r={this.props.r}
          againstMasterDir={false}
        />
        {this.state.displayColorPicker ? (
          <div className="swatch-popover">
            <div className="swatch-cover" onClick={this.handleClose} />
            <GithubPicker
              colors={this.props.colorPalette}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

MasterStitch.propTypes = {
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  c: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  colorPalette: PropTypes.array.isRequired
};
