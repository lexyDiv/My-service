export const toClientCB = ({
  setClient,
  setClientStatus,
  clientRef,
  setClientsArr,
}) => {
  return (type) => {
    if (type === "не определён") {
      setClient(null);
      setClientStatus("");
    } else if (type === "по умолчанию") {
      setClient(clientRef.current);
      setClientStatus("");
      setClientsArr([]);
    } else if (type === "найти") {
      setClientStatus(type);
      setClient(clientRef.current);
    } else {
      setClientStatus(type);
    }
  };
};
