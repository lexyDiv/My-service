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
  oldPass,
  newPass,
  setOldPass,
  setNewPass,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (hc) => {
    if (tele.length <= 1) {
      tele = "";
    }
    console.log(tele);
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("isDeleteBaseFile", isDeleteBaseFile);
    formData.append("phone", isPhoneValid(phone));
    formData.append("email", email);
    formData.append("tele", tele);
    formData.append("newPass", newPass);
    formData.append("oldPass", oldPass);
    baseFile && formData.append("baseFile", baseFile.file);

    axios
      .put("/users/update", formData)
      .then((res) => {
        const { message, user } = res.data;
        if(message === 'ok') {
          setMColor("green");
          setUpdateMessage("Изменения успешно сохранены!");
          dispatch({ type: "GET_USER", payload: user });
          setOldPass("");
          setNewPass("");
        } else if (message === 'reload') {
          window.location.reload();
        } else {
          setMColor("red");
          setUpdateMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
