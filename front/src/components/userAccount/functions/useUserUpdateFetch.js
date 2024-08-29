import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPhoneValid } from "../../../functions/isPhoneValid";

export function useUserUpdateFetch({
//  user,
  name,
  tele,
  phone,
  email,
  isDeleteBaseFile,
  baseFile,
  setUpdateMessage,
  setMColor,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (hc) => {
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("isDeleteBaseFile", isDeleteBaseFile);
    formData.append("phone", isPhoneValid(phone));
    formData.append("email", email);
    formData.append("tele", tele);
   // formData.append("id", user ? user.id: 0);

    baseFile && formData.append("baseFile", baseFile.file);

    axios
      .put("/users/update", formData)
      .then((res) => {
        console.log(res.data);
        const { message } = res.data;
        // if(res.data.message === 'ok') {
        //   setMColor("green");
        //   setUpdateMessage("Изменения успешно сохранены!");
        //   dispatch({ type: "UPDATE_LOCATION", payload: res.data.location });
        // } else if (res.data.code && res.data.code === 'del') {
        //   setMColor("red");
        //   setUpdateMessage(res.data.message);
        //   dispatch({ type: "DELETE_LOCATION", payload: locationId });
        //   setTimeout(() => {
        //     navigate('/locations');
        //   }, 5000);
        // } else {
        //   setMColor("red");
        //   setUpdateMessage(res.data.message);
        // }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
