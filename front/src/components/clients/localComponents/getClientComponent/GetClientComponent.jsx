import React, { useRef, useState } from "react";
import Find from "../../../find/Find";
import { getClientOnDate } from "../../../../functions/getClientOnDate";
import { toFindTimeCB } from "../../../aboutRent/localComponents/updateRent/functions/toFindTimeCB";
import { useDispatch } from "react-redux";
import ClientMessage from "../../../aboutRent/localComponents/updateRent/localComponents/clientMessage/ClientMessage";
import ClientItem from "../../../clientItem/ClientItem";

const GetClientComponent = function () {
  const [inputText, setInputText] = useState("");
  const [clientsArr, setClientsArr] = useState([]);
  const [getClientMessage, setGetClientMessage] = useState("");
  const dispatch = useDispatch();
  const refFetchControl = useRef(null);
  const refText = useRef(inputText);
  refText.current = inputText;

  const findCB = getClientOnDate(setClientsArr, dispatch, setGetClientMessage);

  const findTimeCB = toFindTimeCB({
    setInputText,
    refFetchControl,
    findCB,
    refText,
    setClientsArr,
  });



  return (
    <div
      style={{
        marginTop: "15px",
      }}
    >
      <Find
        cb={findCB}
        timeCB={findTimeCB}
        inputText={inputText}
        fildClickCB={() => {
          setGetClientMessage("");
        }}
      />
      {getClientMessage && <ClientMessage message={getClientMessage} />}
      {clientsArr.map(client => <ClientItem key={client.id} client={client}/>)}
    </div>
  );
};

export default GetClientComponent;
