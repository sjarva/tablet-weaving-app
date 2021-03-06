import React from "react";
import "./App.scss";
import Settings from "../settings/Settings";
import PatternContainer from "../pattern-container/PatternContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleHeight = this.handleHeight.bind(this);
    this.handleWidht = this.handleWidht.bind(this);
    this.handleEdgeColumnChange = this.handleEdgeColumnChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.state = {
      width: 12,
      height: 10,
      showEdgeColumns: false,
      numberOfEdgeColumns: 3,
      colorPalette: [
        '#D0021B',
        '#F5A623',
        '#F8E71C',
        '#8B572A',
        '#7ED321',
        '#417505',
        '#BD10E0',
        '#9013FE',
        '#4A90E2',
        '#50E3C2',
        '#B8E986',
        '#000000',
        '#4A4A4A',
        '#9B9B9B',
        '#FFFFFF',
      ]
    };
  }

  handleHeight(num) {
    this.setState({ height: parseInt(num) });
  }

  handleWidht(num) {
    this.setState({ width: parseInt(num) });
  }

  handleShowEdgeChange() {
    this.setState({ showEdgeColumns: !this.state.showEdgeColumns });
  }

  handleEdgeColumnChange(num) {
    this.setState({ numberOfEdgeColumns: parseInt(num) });
  }

  handleColorChange(color, index) {
    const copy = [...this.state.colorPalette];
    copy[index] = color.hex;
    this.setState({ colorPalette: copy });
  }

  render() {
    const width = this.state.width;
    const height = this.state.height;
    const numberOfEdgeColumns = this.state.numberOfEdgeColumns;
    return (
      <div className="grid-wrapper grid-wrapper__border">
        <div className="grid-item-debug" />
        <Settings
          height={height}
          width={width}
          nmbOfEdgeSts={numberOfEdgeColumns}
          handleWidht={this.handleWidht}
          handleHeight={this.handleHeight}
          handleEdge={this.handleEdgeColumnChange}
          handleColor={this.handleColorChange}
          colorPalette={this.state.colorPalette}
        />

        <PatternContainer
          c={width}
          r={height}
          showEdgeSts={this.state.showEdgeColumns}
          nmbOfEdgeSts={numberOfEdgeColumns}
          colorPalette={this.state.colorPalette}
        />
      </div>
    );
  }
}

export default App;
