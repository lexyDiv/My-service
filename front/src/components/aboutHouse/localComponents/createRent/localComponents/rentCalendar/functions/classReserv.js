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
    this.datesArr = [];
  }

  getDatesArr() {
    // console.log("in startDate = ", this.startDate.getMonth());
    this.startTime = this.startDate.getTime();
    this.endTime = this.endDate.getTime();
    let tick = 1;
    while (tick < 1000) {
      tick === 1 && this.datesArr.push(getDateFormat(new Date(this.startTime)));
      if (this.startTime === this.endTime) {
        return;
      }
      const startDateFormat = getDateFormat(
        new Date(this.startTime + oneDay * tick)
      );
      const endDateFormat = getDateFormat(new Date(this.endDate));
      this.datesArr.push(startDateFormat);
      // console.log("startDateFormat = ", startDateFormat, " endDateFormat = " + endDateFormat);
      if (startDateFormat === endDateFormat) {
        break;
      }
      tick++;
    }
    console.log(this.datesArr);
  }
}

// export const reservesDB = [
//   {
//     datesArr: ["24.07.2024", "25.07.2024", "26.07.2024"],
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
  dispatch
) {
  const newReserv = new Reserv(selectedDates[0], selectedDates[1], type);
  newReserv.getDatesArr();
  //reservesDB.push(newReserv);
  /////////////////////////////////
  //house.Rents.push(newReserv);
  dispatch({type: "ADD_RENT", payload: {
    houseId: house.id,
    locationId: location.id,
    rent: newReserv,
  }});
  ////////////////////////////////
  setSelectedDates([]);
  //console.log(reservesDB);
  console.log(newReserv);
  //console.log(reservesDB);
}
