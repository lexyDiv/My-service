export function isPhoneValid(phone) {
  const phoneData = phone.split("").filter((el) => Number(el) || el === "0");
  phoneData[0] = "8";
  if (phoneData.length !== 11) {
    return "";
  }
  return phoneData.join("");
}

// 89213397103
