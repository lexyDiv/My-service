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
      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        const days = JSON.parse(reserv.days);

        const fackeDate = new Date(Number(reserv.endTime) + oneDay);
        const fackeDateFormat = getDateFormat(fackeDate);
        //console.log(fackeDateFormat)
        days.push(fackeDateFormat);
        /////////////////////////////////////////////////////////////////////////
        const divTime = getApparatDate(div.ariaLabel);
        const rStartTime = Number(reserv.startTime);
        const rEndTime = Number(reserv.endTime) + oneDay;
        const rentStartTime = rentStartEnd.startTime
          ? Number(rentStartEnd.startTime)
          : null;
        const rentEndTime = rentStartEnd.endTime
          ? Number(rentStartEnd.endTime)
          : null;
        if (
          (divTime >= rStartTime && divTime <= rEndTime) ||
          (rentStartTime &&
            rentEndTime &&
            divTime >= rentStartTime &&
            divTime <= rentEndTime)
        ) {
          div.style.color = "black";
          div.style.fontWeight = "900";
          color = reserv.type === "go" ? "red" : "yellow";
          color =
            divTime >= rentStartTime && divTime <= rentEndTime
              ? "orange"
              : color;
          if (
            (divTime > rStartTime && divTime < rEndTime) ||
            (divTime > rentStartTime && divTime < rentEndTime)
          ) {
            leftDiv.style.backgroundColor = color;
            rightDiv.style.backgroundColor = color;
          } else if (divTime === rStartTime || divTime === rentStartTime) {
            rightDiv.style.backgroundColor = color;
            rightDiv.style.borderTopLeftRadius = "20px";
            rightDiv.style.borderBottomLeftRadius = "20px";
          } else if (divTime === rEndTime || divTime === rentEndTime) {
            leftDiv.style.backgroundColor = color;
            leftDiv.style.borderTopRightRadius = "20px";
            leftDiv.style.borderBottomRightRadius = "20px";
          }
        }
        // console.log(divTime);

        // for (let j = 0; j < days.length; j++) {
        //   const reservedDay = days[j];
        //   if (reservedDay === div.ariaLabel) {
        //     div.style.color = "black";
        //     div.style.fontWeight = "900";
        //     color = reserv.type === "go" ? "red" : "yellow";
        //     if (j < days.length - 1) {
        //       div.rentId = reserv.id;
        //     }
        //     const isFocus =
        //       focusRent &&
        //       JSON.parse(focusRent.days).find((el) => el === reservedDay);
        //     if (!j) {
        //       // console.log("!j reservedDay = ", reservedDay); // ok
        //       rightDiv.style.backgroundColor = color;
        //       rightDiv.style.borderTopLeftRadius = "20px";
        //       rightDiv.style.borderBottomLeftRadius = "20px";
        //       if (isFocus) {
        //         rightDiv.style.borderLeftStyle = "solid";
        //         rightDiv.style.borderTopStyle = "solid";
        //         rightDiv.style.borderBottomStyle = "solid";
        //       }
        //     }

        //     if (j === days.length - 1) {
        //       // console.log("j === days.length - 1 reservedDay = ", reservedDay);

        //       leftDiv.style.backgroundColor = color;
        //       leftDiv.style.borderTopRightRadius = "20px";
        //       leftDiv.style.borderBottomRightRadius = "20px";
        //       if (
        //         focusRent &&
        //         getDateFormat(new Date(Number(focusRent.endTime) + oneDay)) ===
        //           reservedDay
        //       ) {
        //         // leftDiv.style.backgroundColor = "violet";
        //         leftDiv.style.borderRightStyle = "solid";
        //         leftDiv.style.borderTopStyle = "solid";
        //         leftDiv.style.borderBottomStyle = "solid";
        //       }
        //     }

        //     if (j && j <= days.length - 2) {
        //       leftDiv.style.backgroundColor = color;
        //       rightDiv.style.backgroundColor = color;
        //       if (isFocus) {
        //         rightDiv.style.borderTopStyle = "solid";
        //         leftDiv.style.borderTopStyle = "solid";
        //         rightDiv.style.borderBottomStyle = "solid";
        //         leftDiv.style.borderBottomStyle = "solid";
        //       }
        //     }
        //     break;
        //   }
        // }
        ///////////////////////////////////////////////////////////
        if (color) {
          //  break;
        }
      }
    }
  }
}
