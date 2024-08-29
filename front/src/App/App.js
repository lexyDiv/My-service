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

function App() {
  const { loading } = useSelector((store) => store.loading);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [start, setStart] = useState(false);

  useStart({ dispatch, setStart });

  const resizer = () => {
    dispatch({ type: "RESIZE" });
  };

  useEffect(() => {
    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  }, []);

  //sessionStorage.clear();
  // localStorage.clear();
  return (
    <div className="App">
      <img className="base-fon" src="/tele.jpg" alt="img" />
      <div className="base-fon"></div>
      {/* <FileUpload /> */}
      {user ? <NavComponent user={user} /> : start && <Auth />}
      {loading && <Loading />}
    </div>
  );
}

export default App;
