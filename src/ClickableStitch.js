import React from 'react';
import PropTypes from 'prop-types';
import './ClickableStitch.scss';
import Stitch from './Stitch';

export default class ClickableStitch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        const parentDirection = this.props.parentDirection;
        console.log('ClickableStitch constructor');
        console.log('parentDirection is ', parentDirection);
        this.state = {
            status: parentDirection,
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
        this.setState({status: this.state.status === 'forward' ? 'backward' : 'forward'});
    }

    doDoubleClickAction() {
      console.log('Clickable Stitch Double click works!!');
      this.setState({status: this.state.status === 'double-forward' ? 'double-backward' : 'double-forward'});
    }

    render() {
        return <div className={`grid-item grid-item-${this.props.c}-${this.props.r}`}
        onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
            <Stitch color={this.props.color} status={this.state.status} c={this.props.c} r={this.props.r}></Stitch>
        </div>
    }
}

ClickableStitch.propTypes = {
    c: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    parentDirection: PropTypes.string.isRequired,
}