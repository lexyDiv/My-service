import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPhoneValid } from "../../../../../functions/isPhoneValid";

export function useAdminRegFetch({
  name,
  tele,
  phone,
  email,
  baseFile,
  setUpdateMessage,
  oldPass,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (hc) => {
      if (tele.length <= 1) {
        tele = "";
      }
      hc();
      dispatch({ type: "SET_LOADING", payload: true });
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", isPhoneValid(phone));
      formData.append("email", email);
      formData.append("tele", tele);
      formData.append("oldPass", oldPass);
      baseFile && formData.append("baseFile", baseFile.file);
    }
}
