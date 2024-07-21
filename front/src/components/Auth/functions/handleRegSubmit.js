const handleRegSubmit = function ({
  name,
  password,
  email,
  file,
  corPassword,
  setError,
  e,
}) {
  e.preventDefault();
  if (!name) {
    setError("Введите имя !");
  } else if (!email) {
    setError("Введить свой Email");
  } else if (password.length < 3) {
    setError("Пароль не может быть меньше трёх знаков !");
  } else {
    console.log("submit file ref");
  }
};

export default handleRegSubmit;
