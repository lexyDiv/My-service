import { isFileTypeImage } from "../../../../../functions/isFileTypeImage";

export function filesOnChange({ setFiles, setImages, setUpdateMessage, images }) {
  return (e) => {
    if (e.target.files.length && e.target.files[0]) {
      const file = e.target.files[0]; // доступ к файлу
      if (!isFileTypeImage(file.name)) {
        setUpdateMessage("Формат файла не подходит!");
        return;
      }
      if (file.size > 1048576 * 3) {
        setUpdateMessage("Слишком большой файл. (3 mb. max)!");
        return;
      }
      const oldFile = images.find(el => el.name === file.name);
      if(oldFile) {
        setUpdateMessage("Этот файл уже добавлен!");
        return;
      }

      setFiles((prev) => [...prev, file]);
      setImages((prev) => [...prev, {image: URL.createObjectURL(file), name: file.name}]);
      e.target.value = "";
    }
  };
}
