import { isFileTypeImage } from "../../../../../functions/isFileTypeImage";

export function baseFileOnChangeUpdate({
  baseFile,
  setBaseFile,
  setIsDeleteBaseFile,
  setUpdateMessage,
}) {
  return (e) => {
    if (e.target.files.length && e.target.files[0]) {
      if (baseFile && !baseFile.file) {
        setIsDeleteBaseFile(true);
      }
      const file = e.target.files[0];
      if (!isFileTypeImage(file.name)) {
        setUpdateMessage("Формат файла не подходит!");
        return;
      }
      if (file.size > 1048576 * 3) {
        setUpdateMessage("Слишком большой файл. (3 mb. max)!");
        return;
      }
      setBaseFile({ url: URL.createObjectURL(file), file });
    }
  };
}
