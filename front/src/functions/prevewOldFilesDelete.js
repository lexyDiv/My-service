export function prevewOldFilesDelete({
  oldFile,
  setOldFiles,
  setDeletedFiles,
}) {
  return () => {
    setDeletedFiles((prev) => [...prev, oldFile]);
    setOldFiles((prev) => [...prev.filter((fileData) => fileData !== oldFile)]);
  };
}
