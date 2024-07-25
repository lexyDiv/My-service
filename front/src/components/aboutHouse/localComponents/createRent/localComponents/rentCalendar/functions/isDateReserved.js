export const isDateReserved = function (formatDate, reservesDB) {
    for (let i = 0; i < reservesDB.length; i++) {
      const reserv = reservesDB[i];
      for (let k = 0; k < reserv.datesArr.length; k++) {
        const reservedDay = reserv.datesArr[k];
        if (formatDate === reservedDay) {
          return true;
        }
      }
    }
    return false;
  };