import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useUpdateHouseFetch({
  name,
  address,
  description,
  deletedFiles,
  isDeleteBaseFile,
  files,
  baseFile,
  houseId,
  oldFiles,
  setUpdateMessage,
  setMColor,
  locationId,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (hc) => {
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("houseId", houseId);
    formData.append("locationId", locationId);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("isDeleteBaseFile", isDeleteBaseFile);
    formData.append("oldFiles", JSON.stringify(oldFiles));
    formData.append("deletedFiles", JSON.stringify(deletedFiles));
    baseFile && formData.append("baseFile", baseFile.file);
    files.forEach((fileData, i) => formData.append(`file${i}`, fileData.file));
    formData.append("filesCount", files.length);
    axios
      .put("/houses", formData)
      .then((res) => {
        if (res.data.message === "ok") {
          setMColor("green");
          setUpdateMessage("Изменения успешно сохранены!");
          dispatch({ type: "UPDATE_HOUSE", payload: res.data.house });
        } else if (res.data.code && res.data.code === "del") {
          setMColor("red");
          setUpdateMessage(res.data.message);
          dispatch({ type: "DELETE_HOUSE", payload: houseId });
          setTimeout(() => {
            navigate("/locations");
          }, 5000);
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
