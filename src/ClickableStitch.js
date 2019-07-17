import React from 'react';
import PropTypes from 'prop-types';
import './ClickableStitch.scss';
import Stitch from './Stitch';

export default class ClickableStitch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.state = {
            prevent: false,
            timer: 0,
        }
    }

    handleClick() {
        this.setState({
            timer: setTimeout(() => {
                if (!this.state.prevent) {
                  this.doClickAction();
                }
                this.setState({prevent: false});
              }, 200)
        });
      
    }

    handleDoubleClick() {
      clearTimeout(this.state.timer);
      this.setState({prevent: true});
      this.doDoubleClickAction();
    }

    doClickAction() {
        console.log('Clickable stitch click!');
        this.props.handleClick(this.props.r);
    }

    doDoubleClickAction() {
      console.log('Clickable Stitch Double click works!!');
      this.props.handleDoubleClick(this.props.r);
    }

    render() {
        return <div className={`grid-item grid-item-${this.props.c}-${this.props.r}`}
        onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
            <Stitch 
            color={this.props.color}
            status={this.props.direction}
            c={this.props.c}
            r={this.props.r}
            againstMasterDir={this.props.againstMasterDir}
            isDouble={this.props.isDouble}
            number={this.props.number}
            ></Stitch>
        </div>
    }
}

ClickableStitch.propTypes = {
    c: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    againstMasterDir: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleDoubleClick: PropTypes.func.isRequired,
    isDouble: PropTypes.bool.isRequired,
    number: PropTypes.number,
}