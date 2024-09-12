import MainUpdater from "../localComponents/mainUpdater/MainUpdater";
import NewsCreator from "../localComponents/newsCreator/NewsCreator";

export function administrationContCallBack(localPage, updateMessage, setUpdateMessage) {
  if (localPage === "создать новость") {
    return <NewsCreator />;
  } else if (localPage === "редактировать видео главной страницы") {
    return <MainUpdater updateMessage={updateMessage} setUpdateMessage={setUpdateMessage} />;
  }
}
