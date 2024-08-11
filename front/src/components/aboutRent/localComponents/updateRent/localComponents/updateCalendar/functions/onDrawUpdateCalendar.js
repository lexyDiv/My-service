import { getDateFormat } from "../../../../../../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";
import { oneDay } from "../../../../../../Calendars/Calendar1";

export function getApparatDate(formatDate) {
  const prev = formatDate.split(".");
  prev.unshift(prev.splice(1, 1)[0]);
  return new Date(prev.join(".")).getTime();
}

export function onDrawUpdateCalendar(el, reservesDB, focusRent, rentStartEnd) {
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

      let color = "";

      const divTime = getApparatDate(div.ariaLabel);
      const rentStartTime = rentStartEnd.startTime
        ? Number(rentStartEnd.startTime)
        : null;
      const rentEndTime = rentStartEnd.endTime
        ? Number(rentStartEnd.endTime) + oneDay
        : null;

      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        // const days = JSON.parse(reserv.days);

        // const fackeDate = new Date(Number(reserv.endTime) + oneDay);
        // const fackeDateFormat = getDateFormat(fackeDate);
        // //console.log(fackeDateFormat)
        // days.push(fackeDateFormat);
        /////////////////////////////////////////////////////////////////////////
        // const divTime = getApparatDate(div.ariaLabel);
        const rStartTime = Number(reserv.startTime);
        const rEndTime = Number(reserv.endTime) + oneDay;
        // const rentStartTime = rentStartEnd.startTime
        // ? Number(rentStartEnd.startTime)
        // : null;
        // const rentEndTime = rentStartEnd.endTime
        //   ? Number(rentStartEnd.endTime) + oneDay
        //   : null;
        // console.log("this is draw ", rentEndTime);
        if (
          (divTime >= rStartTime && divTime <= rEndTime) ||
          (rentStartTime &&
            // rentEndTime &&
            divTime >= rentStartTime &&
            divTime <= rentEndTime)
        ) {
          div.style.color = "black";
          div.style.fontWeight = "900";
          color = reserv.type === "go" ? "red" : "yellow";
          color =
            divTime >= rentStartTime &&
            divTime <= rentEndTime &&
            !rightDiv.style.backgroundColor.color
              ? "orange"
              : color;
          if (
            (divTime > rStartTime && divTime < rEndTime) ||
            (divTime > rentStartTime && divTime < rentEndTime)
          ) {
            leftDiv.style.backgroundColor = color;
            rightDiv.style.backgroundColor = color;
          }
          if (divTime === rStartTime || divTime === rentStartTime) {
            if (divTime !== rentStartTime) {
              color = reserv.type === "go" ? "red" : "yellow";
            }
            rightDiv.style.backgroundColor = color;
            rightDiv.style.borderTopLeftRadius = "20px";
            rightDiv.style.borderBottomLeftRadius = "20px";
          }
          if (divTime === rEndTime || divTime === rentEndTime) {
            if (divTime !== rentEndTime) {
              color = reserv.type === "go" ? "red" : "yellow";
            }
            leftDiv.style.backgroundColor = color;
            leftDiv.style.borderTopRightRadius = "20px";
            leftDiv.style.borderBottomRightRadius = "20px";
          }
        }
        if (
          !rentEndTime &&
          // rentStartTime === rEndTime &&
          divTime === rentStartTime
        ) {
          rightDiv.style.backgroundColor = "";
          // leftDiv.style.backgroundColor = "";
        }
      }
      if (!rentEndTime && divTime === rentStartTime) {
        rightDiv.style.backgroundColor = "orange";
        rightDiv.style.borderTopLeftRadius = "20px";
        rightDiv.style.borderBottomLeftRadius = "20px";
      }
    }
  }
}
