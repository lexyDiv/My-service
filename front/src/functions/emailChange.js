export function emailChange(setEmail) {
   return (e) => {
      setEmail(e.target.value.split("").filter(el => el !== " ").join(""));
   }
}