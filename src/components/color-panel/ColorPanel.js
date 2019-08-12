import React from "react";
import ColorButton from "../color-button/ColorButton";

const ColorPanel = ({colors, handleChange}) => {
    let index = -1;
    return <div>
        {colors.map((color) => {
            index++;
            return (<ColorButton color={color} index={index} key={index} handleChange={handleChange}></ColorButton>);
            })
        }
         </div>;
};

export default ColorPanel;
