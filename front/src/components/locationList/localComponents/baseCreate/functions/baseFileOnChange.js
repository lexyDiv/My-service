import { isFileTypeImage } from "../../../../../functions/isFileTypeImage";

export function baseFileOnChange({ setBaseFile, setUpdateMessage }) {
  return (e) => {
    if (e.target.files.length && e.target.files[0]) {
      const file = e.target.files[0];
      if(!isFileTypeImage(file.name)) {
        setUpdateMessage("Формат файла не подходит!");
        return;
      }
      if(file.size > 1048576 * 5) {
        setUpdateMessage("Слишком большой файл. (5 mb. max)!");
        return;
      }
      setBaseFile({ url:  URL.createObjectURL(file), file}); 
    }
  };
}
