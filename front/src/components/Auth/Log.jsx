import React, { useState } from "react";

const Log = ({setForm}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  return (
    <div className="auth-form">
      <form>


        <div className="mb-3">
          <label className="form-label">Email адрес</label>
          <input type="email" className="form-control" placeholder="email" />
        </div>



        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
          />
        </div>


        <div id="auth-buttons">
          <button type="submit" className="btn btn-primary">
            Вход
          </button>
          <button type="button" className="btn btn-success acc"
         onClick={() => setForm('reg')} >
            У меня нет аккаунта
          </button>
        </div>
      </form>
    </div>
  );
};

export default Log;