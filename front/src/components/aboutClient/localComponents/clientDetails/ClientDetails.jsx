import React from "react";
import './ClientDetails.css';

const ClientDetails = function ({ client }) {
    return (
        <div id="client-details">
          this is client details {client.id}
        </div>
    )
}

export default ClientDetails;