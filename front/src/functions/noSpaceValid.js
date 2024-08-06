export function noSpaceValid(str) {
  return str.split("").filter(el => el !== " ").join("");
}