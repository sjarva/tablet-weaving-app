import React from "react";
import { SketchPicker } from "react-color";
import "./ColorButton.scss";

export default class ColorButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Using color prop only to set initial color
    this.state = {
      displayColorPicker: false,
      color: {
        r: this.props.color !== undefined ? this.props.color.r : "241",
        g: this.props.color !== undefined ? this.props.color.g : "112",
        b: this.props.color !== undefined ? this.props.color.b : "19",
        a: this.props.color !== undefined ? this.props.color.a : "1"
      }
    };
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.setState({ color: color.rgb });
  }

  render() {
    return (
      <React.Fragment>
        <div className="swatch" onClick={this.handleClick}>
          <div
            className="swatch-color"
            style={{
              background: `rgba(${this.state.color.r}, ${this.state.color.g}, 
                ${this.state.color.b}, ${this.state.color.a})`
            }}
          />
        </div>
        {this.state.displayColorPicker ? (
          <div className="swatch-popover">
            <div className="swatch-cover" onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
