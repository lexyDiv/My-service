import { getApparatDate } from "../../../../aboutRent/localComponents/updateRent/localComponents/updateCalendar/functions/onDrawUpdateCalendar";
import { oneDay } from "../../../../Calendars/Calendar1";

export function quickOnDraw(el, newInterval, reservesDB) {
  const cal =
    el.current && el.current.firstChild && el.current.firstChild.lastChild;
  if (cal) {
    for (let i = 0; i < cal.childNodes.length; i++) {
      const div = cal.childNodes[i];
      if (!div.update) {
        div.update = "ok";
        const leftDiv = document.createElement("div");
        leftDiv.className = "left-div";
        const rightDiv = document.createElement("div");
        rightDiv.className = "right-div";

        div.appendChild(leftDiv);
        div.appendChild(rightDiv);
      }
    }

    for (let i = 0; i < cal.childNodes.length; i++) {
      const div = cal.childNodes[i];
      div.style.color = "";
      div.style.fontWeight = "";
      div.rentId = 0;
      let cNLength = div.childNodes.length;
      let leftDiv = null;
      let rightDiv = null;

      for (let h = 0; h < cNLength; h++) {
        const childDiv = div.childNodes[h];
        if (childDiv.className === "left-div") {
          leftDiv = childDiv;
        } else if (childDiv.className === "right-div") {
          rightDiv = childDiv;
        }
      }

      rightDiv.style.backgroundColor = "";
      leftDiv.style.backgroundColor = "";
      leftDiv.style.borderTopLeftRadius = "0px";
      leftDiv.style.borderBottomLeftRadius = "0px";
      leftDiv.style.borderTopRightRadius = "0px";
      leftDiv.style.borderBottomRightRadius = "0px";
      rightDiv.style.borderTopLeftRadius = "0px";
      rightDiv.style.borderBottomLeftRadius = "0px";
      rightDiv.style.borderTopRightRadius = "0px";
      rightDiv.style.borderBottomRightRadius = "0px";

      rightDiv.style.borderLeftStyle = "";
      rightDiv.style.borderLeftColor = "blue";
      rightDiv.style.borderTopStyle = "";
      rightDiv.style.borderTopColor = "blue";
      rightDiv.style.borderBottomStyle = "";
      rightDiv.style.borderBottomColor = "blue";

      rightDiv.style.borderTopStyle = "";
      rightDiv.style.borderTopColor = "blue";
      leftDiv.style.borderTopStyle = "";
      leftDiv.style.borderRightStyle = "";
      leftDiv.style.borderTopColor = "blue";
      leftDiv.style.borderRightColor = "blue";
      rightDiv.style.borderBottomStyle = "";
      rightDiv.style.borderBottomColor = "blue";
      leftDiv.style.borderBottomStyle = "";
      leftDiv.style.borderBottomColor = "blue";

      const divTime = getApparatDate(div.ariaLabel);

      if (newInterval.startTime) {
        const nStartTime = newInterval.startTime;
        if (nStartTime === divTime) {
          rightDiv.style.backgroundColor = "grey";
          rightDiv.style.borderTopLeftRadius = "60%";
          rightDiv.style.borderBottomLeftRadius = "60%";
        }
        if (newInterval.endTime) {
          const nEndTime = newInterval.endTime + oneDay;
          if (nEndTime === divTime) {
            leftDiv.style.backgroundColor = "grey";
            leftDiv.style.borderBottomRightRadius = "60%";
            leftDiv.style.borderTopRightRadius = "60%";
          } else if (divTime > nStartTime && divTime < nEndTime) {
            leftDiv.style.backgroundColor = "grey";
            rightDiv.style.backgroundColor = "grey";
          }
        }
      }
    }
  }
}
