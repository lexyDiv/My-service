import { getDateFormat } from "./functions/getDateFormat";

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
      if(this.startTime === this.endTime)
      {
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

export const reserves = [];

export function reservProg(setSelectedDates, date) {
  setSelectedDates((prev) => {
    if (prev.length === 2) {
      return [];
    }
    return [...prev, date];
  });
}

export function addReserv(selectedDates, setSelectedDates, type) {
  const newReserv = new Reserv(selectedDates[0], selectedDates[1], type);
  newReserv.getDatesArr();
  reserves.push(newReserv);
  setSelectedDates([]);
  console.log(reserves);
}
