import axios from "axios";
import { useDispatch } from "react-redux";

export function useCreateBaseFetch({
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
}) {
  const dispatch = useDispatch();
  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("status", "?");
    formData.append("type", "?");
    formData.append("data", JSON.stringify({content: '?'}));
    baseFile && formData.append("baseFile", baseFile.file);
    files.forEach((fileData, i) => formData.append(`file${i}`, fileData.file));
    formData.append("filesCount", files.length);
    axios
      .post("/locations", formData)
      .then((res) => {
        if (res.data.message !== "ok") {
          setMColor("red");
          setUpdateMessage(res.data.message);
        } else {
          setUpdateMessage("Новая база успешно создана!");
          dispatch({ type: "ADD_LOCATION", payload: res.data.location });
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
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
