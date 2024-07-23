import React, { useState } from "react";
import handleLodSubmit from "./functions/handleLOgSubmit";
import { useDispatch, useSelector } from "react-redux";

const Log = ({ setForm }) => {
  const { loading } = useSelector((store) => store.loading);

  const [email, setEmail] = useState("");
  const [corPassword, setCorPassword] = useState("");
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    handleLodSubmit({ e, email, corPassword, dispatch, setError });
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit} onClick={() => setError('')}>
        <div className="mb-3">
          <label className="form-label">Email адрес</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Корпоративный пароль</label>
          <input
            // value={corPassword}
            type="password"
            className="form-control"
            //  id="exampleInputPassword2"
            placeholder="Corporation password"
            onChange={(e) => setCorPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-3">
            <label style={{ color: "red" }} className="form-label">
              {error}
            </label>
          </div>
        )}

        <div id="auth-buttons">
          <button type="submit" className="btn btn-primary">
            Вход
          </button>
          <button
            type="button"
            className="btn btn-success acc"
            onClick={() => setForm("reg")}
          >
            У меня нет аккаунта
          </button>
        </div>
      </form>
    </div>
  );
};

export default Log;
