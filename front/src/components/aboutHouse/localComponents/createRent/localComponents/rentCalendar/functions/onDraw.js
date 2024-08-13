import { getApparatDate } from "../../../../../../aboutRent/localComponents/updateRent/localComponents/updateCalendar/functions/onDrawUpdateCalendar";
import { oneDay } from "../../../../../../Calendars/Calendar1";
import { getDateFormat } from "./getDateFormat";

export function onDraw(el, reservesDB, focusRent) {
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
      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        const color = reserv.type === "go" ? "red" : "yellow";
        const rStartTime = Number(reserv.startTime);
        const rEndTime = Number(reserv.endTime) + oneDay;

        if (divTime === rStartTime) {
          rightDiv.style.backgroundColor = color;
          rightDiv.style.borderTopLeftRadius = "20px";
          rightDiv.style.borderBottomLeftRadius = "20px";
          div.rentId = reserv.id;
        } else if (divTime === rEndTime) {
          leftDiv.style.backgroundColor = color;
          leftDiv.style.borderTopRightRadius = "20px";
          leftDiv.style.borderBottomRightRadius = "20px";
        } else if (divTime > rStartTime && divTime < rEndTime) {
          leftDiv.style.backgroundColor = color;
          rightDiv.style.backgroundColor = color;
          div.rentId = reserv.id;
        }

        if (focusRent) {
          const focusStartTime = Number(focusRent.startTime);
          const focusEndTime = Number(focusRent.endTime) + oneDay;

          if (focusStartTime === divTime) {
            rightDiv.style.borderLeftStyle = "solid";
            rightDiv.style.borderTopStyle = "solid";
            rightDiv.style.borderBottomStyle = "solid";
          } else if (focusEndTime === divTime) {
            leftDiv.style.borderRightStyle = "solid";
            leftDiv.style.borderTopStyle = "solid";
            leftDiv.style.borderBottomStyle = "solid";
          } else if (divTime > focusStartTime && divTime < focusEndTime) {
            rightDiv.style.borderTopStyle = "solid";
            leftDiv.style.borderTopStyle = "solid";
            rightDiv.style.borderBottomStyle = "solid";
            leftDiv.style.borderBottomStyle = "solid";
          }
        }
      }
    }
  }
}
