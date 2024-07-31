import axios from "axios";

export function addRComment(locationId, houseId, rentId, user, dispatch) {
  return async (messageText) => {
    const formData = new FormData();
    formData.append("value", messageText);
    formData.append("rent_id", rentId);
    formData.append("user_id", user.id);
    formData.append("date", String(new Date().getTime()));

    axios
      .post("/rcomment", formData)
      .then((res) => {
        if (res.data.message === "ok") {
          dispatch({
            type: "ADD_RCOMMENT",
            payload: {
              rComment: res.data.rComment,
              locationId: Number(locationId),
              houseId: Number(houseId),
              rentId: Number(rentId),
            },
          });
        }
        console.log(res.data.rComment);
      })
      .catch((err) => console.log(err.message));
  };
}
