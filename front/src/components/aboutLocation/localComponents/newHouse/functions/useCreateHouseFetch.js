import axios from "axios";
import { useDispatch } from "react-redux";

export function useCreateHouseFetch({
  name,
  description,
  address,
  setUpdateMessage,
  setName,
  setDescription,
  setAddress,
  baseFile,
  setBaseFile,
  files,
  setFiles,
  setMColor,
  location,
}) {
  const dispatch = useDispatch();
  return async (hc) => {
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("status", "?");
    formData.append("type", "?");
    formData.append("location_id", location.id);
    formData.append("data", JSON.stringify({ content: "?" }));
    baseFile && formData.append("baseFile", baseFile.file);
    files.forEach((fileData, i) => formData.append(`file${i}`, fileData.file));
    formData.append("filesCount", files.length);
    axios
      .post("/houses", formData)
      .then((res) => {
        if (res.data.message !== "ok") {
          setMColor("red");
          setUpdateMessage(res.data.message);
        } else {
          setUpdateMessage("Новый дом успешно создан!");
          dispatch({ type: "ADD_HOUSE", payload: res.data.house });
          setName("");
          setDescription("");
          setAddress("");
          setBaseFile(null);
          setFiles([]);
          setMColor("green");
        }
      })
      .catch((err) => {
        console.log(err);
        setUpdateMessage("Что-то пошло не так. Попробуйте позже!");
        setMColor("red");
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
