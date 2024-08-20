export function baseCreateGlobalMessage({ setUpdateMessage }) {
    return () => {
        setUpdateMessage("");
    }
}