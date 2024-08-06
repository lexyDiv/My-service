import React from "react";
import './RentClient.css'
import { Avatar } from "@mui/material";

const RentClient = function({ client }) {

    return (
        <div id="rent-client">
           <Avatar alt="Remy Sharp" src={client.image} />
           <p>{client.name}</p>
           <p>{client.login}</p>
           <p>{client.phone}</p>
           <p>{client.tele}</p>
           <p>{client.email}</p>
           <p style={{
            color: 'green',
            fontStyle: 'italic',
            textAlign: 'center'
           }}>{client.about}</p>
        </div>
    )
}

export default RentClient;