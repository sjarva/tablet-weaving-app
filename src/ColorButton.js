import React from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import "./ColorButton.scss";

export default class ColorButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      displayColorPicker: false
    };
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.props.handleChange(color, this.props.index);
  }

  render() {
    return (
      <React.Fragment>
        <div className="swatch" onClick={this.handleClick}>
          <div
            className="swatch-color"
            style={{
              background: this.props.color
            }}
          />
        </div>
        {this.state.displayColorPicker ? (
          <div className="swatch-popover">
            <div className="swatch-cover" onClick={this.handleClose} />
            <SketchPicker
              color={this.props.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

ColorButton.propTypes = {
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};
