import React from "react";
import './ClientUpdate.css';

const ClientUpdate = function({ client }) {
   return (
    <div id="client-update" >
      this is client update {client.id}
    </div>
   )
}

export default ClientUpdate;