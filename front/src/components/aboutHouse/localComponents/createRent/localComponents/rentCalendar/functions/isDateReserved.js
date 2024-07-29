export const isDateReserved = function (formatDate, reservesDB) {
  for (let i = 0; i < reservesDB.length; i++) {
    const reserv = reservesDB[i];
    if (
      formatDate >= Number(reserv.startTime) &&
      formatDate <= Number(reserv.endTime)
    ) {
      return true;
    }
  }
  return false;
};
