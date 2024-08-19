export function teleChange(setTele) {
   return (e) => {
    setTele(e.target.value.split("").filter(el => el !== " ").join(""));
    !e.target.value.length && setTele("@");
   }
}