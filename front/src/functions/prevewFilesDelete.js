export function prevewFilesDelete({ file, setFiles }) {
  return () => {
    setFiles((prev) => [
      ...prev.filter((fileData) => fileData.file.name !== file.file.name),
    ]);
  };
}
