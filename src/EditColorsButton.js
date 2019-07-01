import React from 'react';
import { SketchPicker } from 'react-color';

export default class EditColorsButton extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleColorChangeComplete = this.handleColorChangeComplete.bind(this);
        this.state = {
            showPicker: false,
            color: 'FFFFFF',
        }
    }

    handleClick() {
        this.setState({showPicker: !this.state.showPicker});
    }

    handleColorChangeComplete() {
        console.log('picker change complete');
    }

    render() {
        return <div>
            <button onClick={this.handleClick}>Muokkaa väripalettia</button>
            {/*<SketchPicker color={this.state.color}
            onChangeComplete={this.handleColorChangeComplete}></SketchPicker>*/}
        </div>;
    }
}