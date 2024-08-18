import AllApplicationsClient from "../localComponents/allApplicationsClient/AllApplicationsClient";
import AllRentsClient from "../localComponents/allRentsClient/AllRentsClient";
import ClientUpdate from "../localComponents/clientUpdate/ClientUpdate";

export function useSetContentAboutClient(client, localPage) {
  let constCallBack = null;
  const arr = [1];
  if (client && localPage === "все бронирования клиета с") {
      return arr.map((_, i) => <AllRentsClient key={i} client={client} />);
  } else if(client && localPage === "все заявки клиента с") {
      return arr.map((_, i) => <AllApplicationsClient key={i} client={client} />);
  } else if (client && localPage === "редактировать клиента с") {
    constCallBack = arr.map((_, i) => <ClientUpdate key={i} client={client} />);
  }
  return constCallBack;
}
