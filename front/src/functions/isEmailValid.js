export function isEmailValid(email) {
  const dogIndex = email.split("").findIndex((el) => el === "@");
  const pastDog =
    dogIndex && dogIndex !== -1 && email.slice(dogIndex + 1).length;
  const pastDogPointIndex =
    pastDog &&
    email
      .slice(dogIndex + 1)
      .split("")
      .findIndex((el) => el === ".");
  const pastPoint =
    pastDogPointIndex &&
    pastDogPointIndex !== -1 &&
    email.slice(dogIndex + pastDogPointIndex + 1).length;
  if (!email || pastPoint < 3) {
    return "";
  }
  return email;
}
