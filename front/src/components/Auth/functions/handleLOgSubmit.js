import axios from "axios";

const handleLodSubmit = async function({dispatch, email, corPassword, e, setError})
{
   e.preventDefault();
    if (!email) {
    setError("Введить свой Email");
  } else if (!corPassword) {
    setError("Введите корпаративный пароль !");
  } else {
    dispatch({type: "SET_LOADING", payload: true});
    const formData = new FormData();

    formData.append("email", email);
    formData.append("corPassword", corPassword);
    axios
      .post("/users/log", formData)
      .then((res) => {
        const { message, user, locations } = res.data;
        if(message === 'ok')
        {
            dispatch({ type: "GET_USER", payload: user });
            dispatch({ type: "GET_LOCATIONS", payload: locations });
        } else {
          setError(message);
        }
        console.log(res.data);
       dispatch({type: "SET_LOADING", payload: false});
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
   
}

export default handleLodSubmit;