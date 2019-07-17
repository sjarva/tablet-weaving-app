import React from "react";
import "./App.scss";
import Settings from "./Settings";
import PatternContainer from "./PatternContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleHeight = this.handleHeight.bind(this);
    this.handleWidht = this.handleWidht.bind(this);
    this.handleEdgeColumnChange = this.handleEdgeColumnChange.bind(this);
    this.state = {
      width: 12,
      height: 10,
      showEdgeColumns: false,
      numberOfEdgeColumns: 3
    };
  }

  handleHeight(num) {
    console.log("new height is ", num);
    this.setState({ height: parseInt(num) });
  }

  handleWidht(num) {
    console.log("new width is ", num);
    this.setState({ width: parseInt(num) });
  }

  handleShowEdgeChange() {
    this.setState({ showEdgeColumns: !this.state.showEdgeColumns });
  }

  handleEdgeColumnChange(num) {
    console.log("new edge column amount is ", num);
    this.setState({ numberOfEdgeColumns: parseInt(num) });
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
        />

        <PatternContainer
          c={width}
          r={height}
          showEdgeSts={this.state.showEdgeColumns}
          nmbOfEdgeSts={numberOfEdgeColumns}
        />
      </div>
    );
  }
}

export default App;
