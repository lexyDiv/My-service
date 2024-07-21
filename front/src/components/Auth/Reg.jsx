import React, { useState } from "react";

const Reg = ({ setForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [corPassword, setCorPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="auth-form" onClick={() => setError("")}>
      <form>
        <div className="mb-3">
          <label className="form-label">Имя</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-text">
            Ваше имя будут видеть другие пользователи.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email адрес</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-text">
            Мы никогда не передадим ваш Email третим лицам.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Аватарка</label>
          <input type="file" className="form-control" placeholder="email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Корпоративный пароль</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Corporation password"
            onChange={(e) => setCorPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-3">
            <label style={{color: 'red'}} className="form-label">{error}</label>
          </div>
        )}

        <div id="auth-buttons">
          <button type="submit" className="btn btn-primary">
            Регистрация
          </button>
          <button
            type="button"
            className="btn btn-success acc"
            onClick={() => setForm("log")}
          >
            У меня уже есть аккаунт
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reg;
