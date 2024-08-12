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
}) => {
  dispatch({ type: "SET_LOADING", payload: true });
  console.log(status);
  const newDays = [];
  const startTime = Number(rentStartEnd.startTime);
  const endTime = Number(rentStartEnd.endTime);
  for(let i = startTime; i <= endTime; i += oneDay) {
   newDays.push(getDateFormat(new Date(i)));
  }
  const updatedRnet = {
   ...rent,
   startTime: rentStartEnd.startTime,
   type: status === "сдано" ? "go" : "hold",
   client_id: client ? client.id : null,
   update_date: new Date().getTime(),
   days: newDays,
  }
  axios.put('/rent', updatedRnet)
  .then(res => {
   //console.log(res.data);
   if(res.data.message === 'ok') {
      console.log("here");
   } else if(res.data.message === 'deleted') {
      console.log('deleted');
   }
   dispatch({ type: "SET_LOADING", payload: false });
  })
  .catch(err => {
   dispatch({ type: "SET_LOADING", payload: false });
   console.log(err.message);
});
};
