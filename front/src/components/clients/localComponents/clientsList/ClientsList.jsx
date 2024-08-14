import React, { useEffect } from "react";
import "./ClientsList.css";
import { useDispatch, useSelector } from "react-redux";
import { getClientsFetch } from "./functions/getClientsFetch";
import ClientItem from "../../../clientItem/ClientItem";

const ClientsList = function () {
  const dispatch = useDispatch();
  const { pagList, clients } = useSelector(
    (store) => store.clientsData
  );

  useEffect(() => {
    getClientsFetch(dispatch, pagList);
  }, [dispatch, pagList]);

 // console.log(pagList, allClientsLength, clients);

  return (
    <div id="clients-list">
      {clients.map((client) => (
        <ClientItem key={client.id} client={client} />
      ))}
    </div>
  );
};

export default ClientsList;
