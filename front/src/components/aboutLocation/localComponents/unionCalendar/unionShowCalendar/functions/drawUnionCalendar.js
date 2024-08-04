import { oneDay } from "../../../../../Calendars/Calendar1";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";

export function drawUnionCalendar(el, rents, index) {
    if(index) {
        el.current.firstChild.firstChild.style.display = 'none';
    }
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

      let color = "";
      for (let k = 0; k < rents.length; k++) {
        const reserv = rents[k];
        const days = JSON.parse(reserv.days);
        days.push(getDateFormat(new Date(Number(reserv.endTime) + oneDay)));
        for (let j = 0; j < days.length; j++) {
          const reservedDay = days[j];
          if (reservedDay === div.ariaLabel) {
            div.style.color = "black";
            color = reserv.type === "go" ? "red" : "yellow";

            if (j === days.length - 1) {
                leftDiv.style.backgroundColor = color;
                leftDiv.style.borderTopRightRadius = "20px";
                leftDiv.style.borderBottomRightRadius = "20px";
             }

            if (!j) {
              rightDiv.style.backgroundColor = color;
              rightDiv.style.borderTopLeftRadius = "20px";
              rightDiv.style.borderBottomLeftRadius = "20px";
            }


            if (j && j <= days.length - 2) {
              leftDiv.style.backgroundColor = color;
              rightDiv.style.backgroundColor = color;
            }
            break;
          }
        }
        if (color) {
        //  break;
        }
        
      }
    }
  }
}
