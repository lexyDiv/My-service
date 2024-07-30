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
        div.appendChild(leftDiv);
        div.appendChild(rightDiv);
        div.appendChild(rightDivNext);
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

      rightDiv.style.borderLeftStyle = "";
      rightDiv.style.borderLeftColor = "blue";
      rightDiv.style.borderTopStyle = "";
      rightDiv.style.borderTopColor = "blue";
      rightDiv.style.borderBottomStyle = "";
      rightDiv.style.borderBottomColor = "blue";

      rightDivNext.style.borderRightStyle = "";
      rightDivNext.style.borderRightColor = "blue";
      rightDivNext.style.borderTopStyle = "";
      rightDivNext.style.borderTopColor = "blue";
      rightDivNext.style.borderBottomStyle = "";
      rightDivNext.style.borderBottomColor = "blue";

      rightDiv.style.borderTopStyle = "";
      rightDiv.style.borderTopColor = "blue";
      leftDiv.style.borderTopStyle = "";
      leftDiv.style.borderTopColor = "blue";
      rightDiv.style.borderBottomStyle = "";
      rightDiv.style.borderBottomColor = "blue";
      leftDiv.style.borderBottomStyle = "";
      leftDiv.style.borderBottomColor = "blue";
      let color = "";
      for (let k = 0; k < reservesDB.length; k++) {
        const reserv = reservesDB[k];
        const days = JSON.parse(reserv.days);
        for (let j = 0; j < days.length; j++) {
          const reservedDay = days[j];
          if (reservedDay === div.ariaLabel) {
            div.style.color = "black";
            div.style.fontWeight = "900";
            color = reserv.type === "go" ? "red" : "yellow";
            div.rentId = reserv.id;
            const isFocus =
              focusRent &&
              JSON.parse(focusRent.days).find((el) => el === reservedDay);
            if (!j) {
              rightDiv.style.backgroundColor = color;
              rightDiv.style.borderTopLeftRadius = "20px";
              rightDiv.style.borderBottomLeftRadius = "20px";
              if (isFocus) {
                rightDiv.style.borderLeftStyle = "solid";
                rightDiv.style.borderTopStyle = "solid";
                rightDiv.style.borderBottomStyle = "solid";
              }
            }

            if (j === days.length - 1) {
              rightDivNext.style.backgroundColor = color;
              rightDivNext.style.borderTopRightRadius = "20px";
              rightDivNext.style.borderBottomRightRadius = "20px";
              if (isFocus) {
                rightDivNext.style.borderRightStyle = "solid";
                rightDivNext.style.borderTopStyle = "solid";
                rightDivNext.style.borderBottomStyle = "solid";
              }
            }

            if (j && j <= days.length - 1) {
              leftDiv.style.backgroundColor = color;
              rightDiv.style.backgroundColor = color;
              if (isFocus) {
                rightDiv.style.borderTopStyle = "solid";
                leftDiv.style.borderTopStyle = "solid";
                rightDiv.style.borderBottomStyle = "solid";
                leftDiv.style.borderBottomStyle = "solid";
              }
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
