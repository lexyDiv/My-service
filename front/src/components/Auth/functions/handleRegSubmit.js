import axios from "axios";

const handleRegSubmit = function ({
  name,
 
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
  } else if (!corPassword) {
    setError("Введите корпаративный пароль !");
  } else {
    const formData = new FormData();
    file && formData.append("file", file); // добавление файла
    formData.append("name", name);
    formData.append("email", email);
    formData.append("corPassword", corPassword);
    axios
      .post("/users/reg", formData)
      .then((res) => {
        const { message } = res.data;
        if(message === 'ok')
        {

        } else {
          setError(message);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

export default handleRegSubmit;
