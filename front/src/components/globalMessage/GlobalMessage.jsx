import React from "react";
import './GlobalMessage.css'

const GlobalMessage = function ({ updateMessage, cb, color }) {
  return (
    <div id="update-message">
      <h5 
      style={{ color: `${color}` }} 
      >{updateMessage}</h5>
      <h4 
      style={{ color: 'green', textDecoration: 'underline', cursor: 'pointer' }}
       onClick={cb}>OK</h4>
    </div>
  );
};

export default GlobalMessage;
