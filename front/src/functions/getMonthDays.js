export function getMonthDays(birthYear, birthManth) {
  const days = [];
  let cd = 1;
  while (true) {
    const monthStr =
      birthManth < 10
        ? "0" + String(birthManth) + "."
        : String(birthManth) + ".";
    const dayStr = cd < 10 ? "0" + String(cd) : String(cd);
    if (
      cd === 32 ||
      new Date(String(birthYear) + "." + monthStr + dayStr).getMonth() !==
        birthManth - 1
    ) {
      return days;
    }
    days.push(cd);
    cd++;
  }
}
