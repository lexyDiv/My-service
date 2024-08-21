export function nameValidatorStart(str) {
  const strArr = str.split("");
  while (strArr.length) {
    if (strArr[0] === " ") {
      strArr.shift();
    } else {
      break;
    }
  }
  return strArr.join("");
}

export function nameValidatorEnd(str) {
  const strArr = str.split("");
  while (strArr.length) {
    if (strArr[strArr.length - 1] === " ") {
      strArr.pop();
    } else {
      break;
    }
  }
  return strArr.join("");
}

export function nameValidatorCenter(str) {
  if (str.length >= 4) {
    let resStr = "";
    for (let i = 0; i < str.length; i++) {
      const litera = str[i];
      if (litera !== " " || resStr[resStr.length - 1] !== " ") {
        resStr += litera;
      }
    }
    return resStr;
  }
  return str;
}

export function nameValidator(str) {
  return nameValidatorCenter(nameValidatorStart(nameValidatorEnd(str)));
}
