export const isDateReserved = function (formatDate, reservesDB) {
    for (let i = 0; i < reservesDB.length; i++) {
      const reserv = reservesDB[i];
      const days = JSON.parse(reserv.days);
      for (let k = 0; k < days.length; k++) {
        const reservedDay = days[k];
        if (formatDate === reservedDay) {
          return true;
        }
      }
    }
    return false;
  };