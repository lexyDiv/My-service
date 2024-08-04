import CreateRent from "../localComponents/createRent/CreateRent";
import HComment from "../localComponents/hComments/HComment";
import RentItem from "../localComponents/rentItem/RentItem";
import UpdateDelete from "../localComponents/updateDelete/UpdateDelete";

export function useSetContentAboutHouse(localPage, house, user, location) {
  let constCallBack;
  const arr = [1];

  if (localPage === "создать бронь/найм в") {
    constCallBack = arr.map((el) => (
      <CreateRent key={el} house={house} user={user} location={location} />
    ));
  } else if (localPage === "комменты по") {
    constCallBack = house.Hcomment2s.map((comment) => (
      <HComment key={comment.id} comment={comment} />
    ));
  } else if (localPage === "вся бронь/найм в") {
    const rents = house.Rents.sort((a, b) => a.id - b.id);
    constCallBack = rents.map((rent) => <RentItem key={rent.id} rent={rent} />);
  } else if (localPage === "редактировать/удалить") {
    constCallBack = arr.map((el) => <UpdateDelete key={el} house={house} />);
  }
  return constCallBack;
}
