import ClientDetails from "../localComponents/clientDetails/ClientDetails";
import ClientUpdate from "../localComponents/clientUpdate/ClientUpdate";

export function useSetContentAboutClient(client, localPage) {
  let constCallBack = null;
  const arr = [1];
  if (client && localPage === "подробно о клиенте с") {
    constCallBack = arr.map((_, i) => (
      <ClientDetails key={i} client={client} />
    ));
  } else if (client && localPage === "редактировать клиента с") {
    constCallBack = arr.map((_, i) => <ClientUpdate key={i} client={client} />);
  }
  return constCallBack;
}
