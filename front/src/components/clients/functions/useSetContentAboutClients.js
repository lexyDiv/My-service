import ClientsList from "../localComponents/clientsList/ClientsList";
import CreateClient from "../localComponents/createClient/CreateClient";
import GetClientComponent from "../localComponents/getClientComponent/GetClientComponent";

export function useSetContentAboutClients(localPage) {
  const arr = [1];
  if (localPage === "все клиенты") {
    return arr.map((_, i) => <ClientsList key={i} />);
  } else if (localPage === "создать клиента") {
    return arr.map((_, i) => <CreateClient key={i} />);
  } else if (localPage === "найти клиента") {
    return arr.map((_, i) => <GetClientComponent key={i} />);
  }
}
