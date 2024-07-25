export function onDraw(el, reservesDB) {
  const cal =
    el.current && el.current.firstChild && el.current.firstChild.lastChild;
  if (cal) {
    for (let i = 0; i < cal.childNodes.length; i++) {
      const div = cal.childNodes[i];
      let color = "";
      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        for (let j = 0; j < reserv.datesArr.length; j++) {
          const reservedDay = reserv.datesArr[j];
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
