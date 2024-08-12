export const toClientCB = ({
  setClient,
  setClientStatus,
  clientRef,
  setClientsArr,
  setGetClientMessage,
}) => {
  return (type) => {
    setTimeout(() => {
      if (type === "не определён") {
        setGetClientMessage("");
        setClient(null);
        setClientStatus("");
      } else if (type === "по умолчанию") {
        setGetClientMessage("");
        setClient(clientRef.current);
        setClientStatus("");
        setClientsArr([]);
      } else if (type === "найти") {
        setClientStatus(type);
        setClient(clientRef.current);
      } else {
        setClientStatus(type);
      }
    }, 100);
  };
};
