export function phoneChange(phone, setPhone) {
  return (e) => {
    setPhone((prev) => e.target.value);
    if (e.target.value.slice(0, 2) !== "+7") {
      setPhone((prev) => "+7");
    }
    if (
      e.target.value.length >= 5 &&
      phone.length - e.target.value.length === -1
    ) {
      const addS = e.target.value
        .split("")
        .filter((el) => Number(el) || el === "0");
      addS.unshift("+");
      addS.splice(2, 0, "(");
      addS.splice(6, 0, ")");
      setPhone((prev) => (prev = addS.join("")));
    }
    if (e.target.value.length > 14) {
      setPhone((prev) => prev.slice(0, 14));
    }
  };
}
