import React from "react";
import './UpdateMessage.css'

const UpdateMessage = function ({ updateMessage, cb, color }) {
  return (
    <div id="update-message">
      <h5 
     // style={{ color: `${color}` }} 
      >{updateMessage}</h5>
      <h4 
      style={{ color: "greenyellow", textDecoration: 'underline', cursor: 'pointer' }}
       onClick={cb}>OK</h4>
    </div>
  );
};

export default UpdateMessage;
