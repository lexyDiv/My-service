/* eslint-disable react-hooks/exhaustive-deps */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import useStart from "../cHooks/useStart";
import { useEffect, useState } from "react";
import NavComponent from "./NavComponent";
import NavComponent2 from "./NavComponent2";
import Favicon from "react-favicon";

let blurInterval = null;
let blurTimer = 0;

function App() {
  const { loading } = useSelector((store) => store.loading);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [start, setStart] = useState(false);

  useStart({ dispatch, setStart });

  const resizer = () => {
    dispatch({ type: "RESIZE" });
  };

  const focusIn = () => {
    clearInterval(blurInterval);
    if (blurTimer >= 300) {
      window.location.reload();
    }
    blurTimer = 0;
  };

  const focusOut = () => {
    blurInterval = setInterval(() => {
      blurTimer < 300 && blurTimer++;
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", resizer);
    window.addEventListener("focus", focusIn);
    window.addEventListener("blur", focusOut);
    return () => {
      window.removeEventListener("resize", resizer);
      window.removeEventListener("blur", focusOut);
      window.removeEventListener("focus", focusIn);
    };
  }, []);

  // <Auth />
  //sessionStorage.clear();
  // localStorage.clear();
  return (
    <div className="App">
      <Favicon url={user ? user.image : '/ass.png'} />
      <img className="base-fon" src="/tele.jpg" alt="img" />
      <div className="base-fon"></div>
      {start && (user ? <NavComponent user={user} /> : <NavComponent2 />)}
      {loading && <Loading />}
    </div>
  );
}

export default App;
