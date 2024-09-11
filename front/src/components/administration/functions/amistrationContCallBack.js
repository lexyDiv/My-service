import MainUpdater from "../localComponents/mainUpdater/MainUpdater";
import NewsCreator from "../localComponents/newsCreator/NewsCreator";

export function administrationContCallBack(localPage) {
  if (localPage === "создать новость") {
    return <NewsCreator />;
  } else if (localPage === "редактировать главную страницу") {
    return <MainUpdater />;
  }
}
