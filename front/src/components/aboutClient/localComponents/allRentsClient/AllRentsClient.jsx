/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGetClientRents } from "./functions/getClientRents";
import RentItem from "../../../aboutHouse/localComponents/rentItem/RentItem";

const AllRentsClient = function({ client }) {

    const [clientRents, setClientRents] = useState([]);

    const toGetClientRents = useGetClientRents(client, setClientRents);

    useEffect(() => {
       toGetClientRents();
    }, []);

  

    return (
        <div id="all-rents-client">
           { clientRents.map(rent => <RentItem key={rent.id} rent={rent}/>) }
        </div>
    )
}

export default AllRentsClient;