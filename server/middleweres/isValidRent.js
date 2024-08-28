function isValidRent(startTime, endTime, rents) {
  for (let i = 0; i < rents.length; i += 1) {
    const rent = rents[i];
    const rentStartTime = Number(rent.startTime);
    const rentEndTime = Number(rent.endTime);
    if (
      (startTime >= rentStartTime && startTime <= rentEndTime)
        || (endTime >= rentStartTime && endTime <= rentEndTime)
        || (startTime <= rentStartTime && endTime >= rentEndTime)
    ) {
      return false;
    }
  }
  return true;
}

module.exports = isValidRent;
