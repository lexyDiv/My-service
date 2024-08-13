import AboutRentItem from "../localComponents/aboutRentItem/AboutRentItem";
import RComment from "../localComponents/rComment/RComment";
import UpdateRent from "../localComponents/updateRent/UpdateRent";

export function useSetContentAboutRent(
  localPage,
  rent,
  user,
  location,
  house,
  setRent
) {
  let constCallBack;
  const arr = [1];
  if (localPage === "подробно по") {
    constCallBack = arr.map((el) => (
      <AboutRentItem key={el} rent={rent} location={location} house={house} />
    ));
  } else if (localPage === "редактировать") {
    // console.log("here");
    constCallBack = arr.map((el) => <UpdateRent key={el} rent={rent} setRent={setRent} />);
  } else if (localPage === "комменты по") {
    constCallBack = rent.Rcomments.sort((a, b) => a.id - b.id).map(
      (comment) => <RComment key={comment.id} comment={comment} />
    );
  }
  return constCallBack;
}
