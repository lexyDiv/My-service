import { noSpaceValid } from "../../../../../functions/noSpaceValid";

export const toFindTimeCB = ({
  setInputText,
  refFetchControl,
  findCB,
  refText,
  setClientsArr,
}) => {
  return (e) => {
    const text = noSpaceValid(e.target.value);
    setInputText(text);
    // if (refFetchControl.current) {
    //   clearTimeout(refFetchControl.current);
    // }
    // refFetchControl.current =
    //   text.length >= 5 &&
    //   setTimeout(() => {
    //     findCB(refText.current);
    //   }, 1000);
    if (!text.length) {
      setClientsArr([]);
    }
  };
};
