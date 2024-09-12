import { isFileTypeVideo } from "../../../../../functions/isFileTypeImage";

export function videoFileOnChange({
  setVideoFile,
  setUpdateMessage,
  setDeletedVideos,
  main,
  mainKey,
  setMessageColor,
}) {
  return (e) => {
    if (e.target.files.length && e.target.files[0]) {
      const file = e.target.files[0];
      if (!isFileTypeVideo(file.name)) {
        setMessageColor("red");
        setUpdateMessage("Формат файла не подходит!");
        return;
      }
      if (file.size > 1048576 * 70) {
        setMessageColor("red");
        setUpdateMessage("Слишком большой файл. (70 mb. max)!");
        return;
      }
      if (main[mainKey]) {
        setDeletedVideos((prev) => {
          if (prev.indexOf(main[mainKey]) === -1) {
            return [...prev, { mainKey, name: main[mainKey] }];
          }
          return prev;
        });
      }
      setVideoFile({ url: URL.createObjectURL(file), file });
    }
  };
}
