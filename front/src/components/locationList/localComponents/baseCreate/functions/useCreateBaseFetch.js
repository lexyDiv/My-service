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
}) {
  const dispatch = useDispatch();
  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    baseFile && formData.append("baseFile", baseFile.file);
    files.forEach((fileData, i) => formData.append(`file${i}`, fileData.file));
    formData.append("filesCount", files.length);
    axios
      .post("/locations", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.massage);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
