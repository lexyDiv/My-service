import axios from "axios";
import { getDateFormat } from "../../../../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";
import { oneDay } from "../../../../Calendars/Calendar1";

export const updateRentFetch = async ({
  rentStartEnd,
  status,
  client,
  statusQO,
  clientRef,
  dispatch,
  rent,
  setRent,
  setCUTypes,
  setRentStartEnd,
  houseRents,
  setUpdateMessage,
}) => {
  dispatch({ type: "SET_LOADING", payload: true });
  const newDays = [];
  const startTime = Number(rentStartEnd.startTime);
  const endTime = Number(rentStartEnd.endTime);
  for (let i = startTime; i <= endTime; i += oneDay) {
    newDays.push(getDateFormat(new Date(i)));
  }

  const updatedRnet = {
    ...rent,
    startTime: rentStartEnd.startTime,
    endTime: rentStartEnd.endTime,
    type: status === "сдано" ? "go" : "hold",
    client_id: client ? client.id : null,
    update_date: String(new Date().getTime()),
    days: JSON.stringify(newDays),
  };
  axios
    .put("/rent", updatedRnet)
    .then((res) => {
      //console.log(res.data);
      if (res.data.message === "ok") {
         setUpdateMessage("ok");
        dispatch({ type: "UPDATE_RENT", payload: res.data.rent });
        clientRef.current = client;
        setRentStartEnd((prev) => ({
          ...prev,
          startTime: res.data.rent.startTime,
          endTime: res.data.rent.endTime,
          clicks: 0,
        }));
        setCUTypes("по умолчанию");
        setRent(res.data.rent);
      } else if (res.data.message === "deleted") {
         setUpdateMessage("delete");
        console.log("deleted");
      } else if (res.data.message === "interval") {
        console.log("interval");
        setUpdateMessage("interval");
        dispatch({
          type: "UPDATE_HOUSE_RENTS",
          payload: {
            locationId: rent.location_id,
            houseId: rent.house_id,
            rents: res.data.rents,
          },
        });
        houseRents.current = res.data.rents.filter((r) => r.id !== rent.id);
        clientRef.current = client;
        setRentStartEnd((prev) => ({
          ...prev,
          startTime: res.data.rent.startTime,
          endTime: res.data.rent.endTime,
          clicks: 0,
        }));
        setCUTypes("по умолчанию");
        setRent(res.data.rent);
      }
      dispatch({ type: "SET_LOADING", payload: false });
    })
    .catch((err) => {
      dispatch({ type: "SET_LOADING", payload: false });
      console.log(err.message);
    });
};
