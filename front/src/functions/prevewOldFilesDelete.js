export function prevewOldFilesDelete({ oldFile, setOldFiles }) {
  return () => {
    setOldFiles((prev) => [...prev.filter((fileData) => fileData !== oldFile)]);
  };
}
