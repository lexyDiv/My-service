export function onDraw(el, reservesDB) {
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
            div.style.borderStyle = "solid";
            div.style.borderColor = "black";
            color = reserv.type === "go" ? "red" : "yellow";
            break;
          } else {
            div.style.borderStyle = "none";
          }
        }
        if (color) {
          break;
        }
      }
      div.style.backgroundColor = color;
      div.style.borderRadius = "10px";
    }
  }
}
