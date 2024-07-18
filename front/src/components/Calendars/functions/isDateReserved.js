export const isDateResved = function (formatDate, reserves) {
  for (let i = 0; i < reserves.length; i++) {
    const reserv = reserves[i];
    for (let k = 0; k < reserv.datesArr.length; k++) {
      const reservedDay = reserv.datesArr[k];
      if (formatDate === reservedDay) {
        return true;
      }
    }
  }
  return false;
};
