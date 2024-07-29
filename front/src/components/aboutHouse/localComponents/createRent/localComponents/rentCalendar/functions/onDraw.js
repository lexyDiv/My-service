export function onDraw(el, reservesDB, focusRent) {
  const cal =
    el.current && el.current.firstChild && el.current.firstChild.lastChild;
  if (cal) {
    for (let i = 0; i < cal.childNodes.length; i++) {
      const div = cal.childNodes[i];
      let color = "";
      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        const days = JSON.parse(reserv.days);
        for (let j = 0; j < days.length; j++) {
          const reservedDay = days[j];
          if (reservedDay === div.ariaLabel) {
            if (
              focusRent &&
              JSON.parse(focusRent.days).find((day) => day === reservedDay)
            ) {
              div.style.borderStyle = "solid";
            } else {
              div.style.borderStyle = "";
            }
            if (!j) {
              div.style.borderTopLeftRadius = "20px";
              div.style.borderBottomLeftRadius = "20px";
            }
            if (j === days.length - 1) {
              div.style.borderTopRightRadius = "20px";
              div.style.borderBottomRightRadius = "20px";
            }

            color = reserv.type === "go" ? "red" : "yellow";
            break;
          } else {
            div.style.borderStyle = "none";
            div.style.borderTopLeftRadius = "0px";
            div.style.borderBottomLeftRadius = "0px";
            div.style.borderTopRightRadius = "0px";
            div.style.borderBottomRightRadius = "0px";
          }
        }
        if (color) {
          break;
        }
      }
      div.style.backgroundColor = color;
      // div.style.borderRadius = "10px";
    }
  }
}
