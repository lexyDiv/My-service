import { isFileTypeImage } from "../../../../../functions/isFileTypeImage";

export function baseFileOnChange({ setBaseFile, setImage, setUpdateMessage }) {
  return (e) => {
    if (e.target.files.length && e.target.files[0]) {
      const file = e.target.files[0]; // доступ к файлу
      if(!isFileTypeImage(file.name)) {
        setUpdateMessage("Формат файла не подходит!");
        return;
      }
      if(file.size > 1048576 * 3) {
        setUpdateMessage("Слишком большой файл. (3 mb. max)!");
        return;
      }
      //console.log(isFileTypeImage(file.name))
      setImage(URL.createObjectURL(file));
      setBaseFile(file); // сохранение файла
     // console.log(file.size)
      //console.log(file.name)
    }
  };
}
