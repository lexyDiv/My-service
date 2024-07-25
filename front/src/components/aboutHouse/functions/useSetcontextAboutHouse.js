import CreateRent from "../localComponents/createRent/CreateRent";
import HComment from "../localComponents/hComments/HComment";
import Rent from "../localComponents/rent/Rent";
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
    constCallBack = house.Rents.map((rent) => (
      <Rent key={rent.id} rent={rent} />
    ));
  } else if (localPage === "редактировать/удалить") {
    constCallBack = arr.map((el) => <UpdateDelete key={el} house={house} />);
  }
  return constCallBack;
}
