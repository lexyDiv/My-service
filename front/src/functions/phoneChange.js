export function phoneChange(phone, setPhone) {
  return (e, def) => {
    setPhone((prev) => {
      prev = e.target.value;
      return prev;
    });
    if (phone.length - e.target.value.length < 0 || def) {
      let addSArr = e.target.value.split("+7").filter((el) => el && el !== "+");
      let phoneArr = addSArr[0]
        .split("")
        .filter((el) => Number(el) || el === "0");
      while (phoneArr.length) {
        if (phoneArr[0] !== "9") {
          phoneArr.shift();
        } else {
          break;
        }
      }
      const phoneValArr = phoneArr.slice(0, 10);
      phoneValArr.unshift("+7");
      phoneValArr.splice(1, 0, "(");
      phoneValArr.splice(5, 0, ")");
      setPhone((prev) => (prev = phoneValArr.join("")));
    }
    if (e.target.value.length < 2) {
      setPhone("+7");
    }
    if (e.target.value.length > 14) {
      setPhone((prev) => prev.slice(0, 14));
    }
  };
}
