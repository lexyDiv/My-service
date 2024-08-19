export function teleChange(setTele) {
  return (e) => {
    const value = e.target.value
      .split("")
      .filter((el) => el !== " " && el !== "@");
    value.unshift("@");
    setTele(value.join(""));
    !e.target.value.length && setTele("@");
  };
}
