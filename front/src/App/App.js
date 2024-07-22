import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import FileUpload from "../components/FileUpload";
import Calendar1 from "../components/Calendars/Calendar1";
import NavBar from "../components/navBar/NavBar";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import useStart from "../cHooks/useStart";

import Auth from "../components/Auth/Auth";
import Main from "../components/main/Main";
import { useState } from "react";

function App() {
  const { loading } = useSelector((store) => store.loading);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [start, setStart] = useState(false);

  useStart({dispatch, setStart});

  return (
    <div className="App">
    
  {/* <FileUpload /> */}
      {user ? (
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Main />} />
            <Route path="/papa" element={<Calendar1 />} />
          </Route>
        </Routes>
        
      ) 
      : start && <Auth/> }
      {loading && <Loading/>}
    </div>
  );
}

export default App;
