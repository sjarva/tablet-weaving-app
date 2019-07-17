import React from "react";
import ColorButton from "./ColorButton";

export default class ColorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="colorPanel">
        <ColorButton color={{ r: 208, g: 2, b: 27, a: 1 }} />
        <ColorButton color={{ r: 245, g: 166, b: 35, a: 1 }} />
        <ColorButton color={{ r: 248, g: 231, b: 28, a: 1 }} />
        <ColorButton color={{ r: 139, g: 87, b: 42, a: 1 }} />
        <ColorButton color={{ r: 126, g: 211, b: 33, a: 1 }} />
        <ColorButton color={{ r: 65, g: 117, b: 5, a: 1 }} />
        <ColorButton color={{ r: 189, g: 16, b: 224, a: 1 }} />
        <ColorButton color={{ r: 75, g: 144, b: 226, a: 1 }} />
        <ColorButton color={{ r: 80, g: 227, b: 194, a: 1 }} />
      </div>
    );
  }
}
