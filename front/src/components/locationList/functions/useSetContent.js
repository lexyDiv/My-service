import { useSelector } from "react-redux";
import Location from "../localComponents/location/Location";
import BaseCreate from "../localComponents/baseCreate/BaseCreate";

export function useSetContent(localPage) {
  const { locations } = useSelector((store) => store.locations);
  const newBase = [1];
  let constCallBack;
  if (localPage === "наши базы") {
    constCallBack = locations.map((location) => (
      <Location key={location.id} location={location} />
    ));
  } else if(localPage === 'создать базу')
  {
      constCallBack = newBase.map((el, i) => <BaseCreate key={i}/>);
  }
  return constCallBack;
}
