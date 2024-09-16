import React from "react";
import './MainContainer.css';

const MainContainer = function({ content, height }) {
    return (
        <div 
        style={{
            height: `${height}px`
        }}
         id="main-container">
           {content}
        </div>
    )
}

export default MainContainer;