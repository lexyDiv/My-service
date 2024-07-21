import React, { useState } from "react";
import Reg from "./Reg";
import './Auth.css'
import Log from "./Log";

const Auth = function () {

const [form, setForm] = useState('reg');

  return (
    <div id="forms-box">
        {form === 'reg' ? <Reg setForm={setForm}/> : <Log setForm={setForm}/>}
    </div>
  );
};

export default Auth;
