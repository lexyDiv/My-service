export function prevewOldFilesDelete({ oldFile, setOldFiles }) {
    return () => {
        console.log(oldFile )
        setOldFiles((prev) => [
            ...prev.filter((fileData) => fileData !== oldFile),
          ]);
    }
}