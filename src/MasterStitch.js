import React from 'react';
import Stitch from './Stitch';
import PropTypes from 'prop-types';


export default class MasterStitch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // Color change
    handleClick() {
        console.log('You clicked a master stitch!');
        //let index = this.props.index;

        // Todo, hoida seuraavan värin valitseminen jotenkin
        //let color = this.props.color;
        // Call a prop
        //this.props.handleColorChange(index, color);
    }

    render() {
        return <div className={`grid-item grid-item-${this.props.c}-${this.props.r}`}
        onClick={this.handleClick}>
            <Stitch color={this.props.color} status={this.props.status} c={this.props.c} r={this.props.r}></Stitch>
        </div>
    }
}

MasterStitch.propTypes = {
    index: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    c: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    handleColorChange: PropTypes.func.isRequired,
}