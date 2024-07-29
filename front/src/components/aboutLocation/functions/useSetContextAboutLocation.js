import House from "../localComponents/house/House";
import NewHouse from "../localComponents/newHouse/NewHouse";
import LComment from "../localComponents/lComment/LComment";
import UnionCalendar from "../localComponents/unionCalendar/UnionCalendar";

export function useSetContentAboutLocation(
  localPage,
  location,
  month,
  setMonth,
  year,
  setYear
) {
  const newHouse = [1];
  let constCallBack;

  if (localPage === "дома в") {
    const houses = location.Houses.sort((a, b) => a.id - b.id);
    constCallBack = houses.map((house) => (
      <House key={house.id} house={house} />
    ));
  } else if (localPage === "новый дом в") {
    constCallBack = newHouse.map((_, i) => <NewHouse key={i} />);
  } else if (localPage === "комменты по") {
    const comments = location.LComments.sort((a, b) => a.id - b.id);
    constCallBack = comments.map((comment) => (
      <LComment key={comment.id} comment={comment} />
    ));
  } else if (localPage === "сводный каледарь по") {
    const houses = location.Houses.sort((a, b) => a.id - b.id);
    constCallBack = houses.map((house, i) => (
      <UnionCalendar
        key={i}
        house={house}
        index={i}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
    ));
  }
  return constCallBack;
}
