import axios from "axios";

export function addRComment(locationId, houseId, rentId, user) {
  return async (messageText) => {
    const formData = new FormData();
    formData.append("value", messageText);
    formData.append("rent_id", rentId);
    formData.append("user_id", user.id);
    formData.append("date", String(new Date().getTime()));

    axios
      .post("/rcomment", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };
}
