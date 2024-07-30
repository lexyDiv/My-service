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
        const rightDivNext = document.createElement("div");
        rightDivNext.className = "right-div-next";
        //console.log(leftDiv)
        div.appendChild(leftDiv);
        div.appendChild(rightDiv);
        div.appendChild(rightDivNext);
      }
    }

    for (let i = 0; i < cal.childNodes.length; i++) {
      const div = cal.childNodes[i];
      div.style.color = "";
      let cNLength = div.childNodes.length;
      let leftDiv = null;
      let rightDiv = null;
      let rightDivNext = null;

      for (let h = 0; h < cNLength; h++) {
        const childDiv = div.childNodes[h];
        if (childDiv.className === "left-div") {
          leftDiv = childDiv;
        } else if (childDiv.className === "right-div") {
          rightDiv = childDiv;
        } else if (childDiv.className === "right-div-next") {
          rightDivNext = childDiv;
        }
      }

      rightDiv.style.backgroundColor = "";
      leftDiv.style.backgroundColor = "";
      rightDivNext.style.backgroundColor = "";
      leftDiv.style.borderTopLeftRadius = "0px";
      leftDiv.style.borderBottomLeftRadius = "0px";
      leftDiv.style.borderTopRightRadius = "0px";
      leftDiv.style.borderBottomRightRadius = "0px";
      rightDiv.style.borderTopLeftRadius = "0px";
      rightDiv.style.borderBottomLeftRadius = "0px";
      rightDiv.style.borderTopRightRadius = "0px";
      rightDiv.style.borderBottomRightRadius = "0px";
      rightDivNext.style.borderTopLeftRadius = "0px";
      rightDivNext.style.borderBottomLeftRadius = "0px";
      rightDivNext.style.borderTopRightRadius = "0px";
      rightDivNext.style.borderBottomRightRadius = "0px";

      let color = "";
      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        const days = JSON.parse(reserv.days);
        for (let j = 0; j < days.length; j++) {
          const reservedDay = days[j];
          if (reservedDay === div.ariaLabel) {
            div.style.color = "black";
            color = reserv.type === "go" ? "red" : "yellow";

            if (!j) {
              rightDiv.style.backgroundColor = color;
              rightDiv.style.borderTopLeftRadius = "20px";
              rightDiv.style.borderBottomLeftRadius = "20px";
            }

            if (j === days.length - 1) {
              rightDivNext.style.backgroundColor = color;
              rightDivNext.style.borderTopRightRadius = "20px";
              rightDivNext.style.borderBottomRightRadius = "20px";
            }

            if (j && j <= days.length - 1) {
              leftDiv.style.backgroundColor = color;
              rightDiv.style.backgroundColor = color;
            }
            break;
          }
        }
        if (color) {
          break;
        }
      }
    }
  }
}
