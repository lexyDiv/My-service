/* eslint-disable react-hooks/exhaustive-deps */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import useStart from "../cHooks/useStart";

import Auth from "../components/Auth/Auth";

import { useEffect, useState } from "react";
import NavComponent from "./NavComponent";
import NavComponent2 from "./NavComponent2";

function App() {
  const { loading } = useSelector((store) => store.loading);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [start, setStart] = useState(false);

  useStart({ dispatch, setStart });

  const resizer = () => {
    dispatch({ type: "RESIZE" });
  };

  // const focuser = () => {
  //   window.location.reload();
  // }

  useEffect(() => {

    window.addEventListener("resize", resizer);
   // window.addEventListener("focus", focuser);
    return () => {
      window.removeEventListener("resize", resizer);
     // window.removeEventListener("focus", focuser);
    };
  }, []);

  // <Auth />
  //sessionStorage.clear();
  // localStorage.clear();
  return (
    <div className="App">
      <img className="base-fon" src="/tele.jpg" alt="img" />
      <div className="base-fon"></div>
      {start && (user ? <NavComponent user={user} /> : <NavComponent2 />)}
      {loading && <Loading />}
    </div>
  );
}

export default App;
