import React from "react";
import './ClientMessage.css';

const ClientMessage = function({ message }) {
   // console.log(message)
    return (
        <div id="client-message-box">
         {message}
        </div>
    )
}

export default ClientMessage;