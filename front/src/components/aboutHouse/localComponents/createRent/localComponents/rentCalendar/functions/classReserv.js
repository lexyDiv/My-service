import axios from "axios";
import { getDateFormat } from "./getDateFormat";

const oneDay = 86400000;
//const today = new Date().getTime() + oneDay;
//const globalStartDate = new Date().getTime() - oneDay * 160;

class Reserv {
  constructor(startDate, endDate, type) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = 0;
    this.endTime = 0;
    this.type = type;
    this.days = [];
  }

  getdays() {
    // console.log("in startDate = ", this.startDate.getMonth());
    this.startTime = this.startDate.getTime();
    this.endTime = this.endDate.getTime();
    let tick = 1;
    while (tick < 1000) {
      tick === 1 && this.days.push(getDateFormat(new Date(this.startTime)));
      if (this.startTime === this.endTime) {
        return;
      }
      const startDateFormat = getDateFormat(
        new Date(this.startTime + oneDay * tick)
      );
      const endDateFormat = getDateFormat(new Date(this.endDate));
      this.days.push(startDateFormat);
      // console.log("startDateFormat = ", startDateFormat, " endDateFormat = " + endDateFormat);
      if (startDateFormat === endDateFormat) {
        break;
      }
      tick++;
    }
   // console.log(this.days);
  }
}

// export const reservesDB = [
//   {
//     days: ["24.07.2024", "25.07.2024", "26.07.2024"],
//     endDate: "Fri Jul 26 2024 00:00:00 GMT+0300 (Москва, стандартное время)",
//     endTime: 1721941200000,
//     startDate: "Wed Jul 24 2024 00:00:00 GMT+0300 (Москва, стандартное время)",
//     startTime: 1721768400000,
//     type: "hold",
//   },
// ];

export function reservProg(setSelectedDates, date) {
  setSelectedDates((prev) => {
    if (prev.length === 2) {
      return [];
    }
    return [...prev, date];
  });
}

export async function addReserv(
  selectedDates,
  setSelectedDates,
  type,
  user,
  house,
  location,
  dispatch,
  setFocusRent
) {

  dispatch({ type: 'SET_LOADING', payload: true });

  const newRent = new Reserv(selectedDates[0], selectedDates[1], type);
  newRent.getdays();
  newRent.days = JSON.stringify(newRent.days);
  newRent.house_id = house.id;
  newRent.date = getDateFormat(new Date());
  newRent.status = "pizdez";
  newRent.user_id = user.id;
  newRent.data = "polny pizdez";
  newRent.startDate = JSON.stringify(newRent.startDate);
  newRent.endDate = JSON.stringify(newRent.endDate);

  axios
    .post("/rent", newRent)
    .then((res) => {
      const { data } = res;
      dispatch({
        type: "ADD_RENT",
        payload: {
          houseId: house.id,
          locationId: location.id,
          rent: data,
        },
      });
      setFocusRent(data);
      dispatch({ type: 'SET_LOADING', payload: false });
    })
    .catch((err) => {
      dispatch({ type: 'SET_LOADING', payload: false });
      console(err);
    });
  setSelectedDates([]);
}
