import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import FileUpload from "../components/FileUpload";
import Calendar1 from "../components/Calendars/Calendar1";
import NavBar from "../components/navBar/NavBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import useStart from "../cHooks/useStart";

import Auth from "../components/Auth/Auth";

import { useState } from "react";
import LocationList from "../components/locationList/LocationList";
import Chat from "../components/chat/Chat";
import AboutLocation from "../components/aboutLocation/AboutLocation";
import AboutHouse from "../components/aboutHouse/AboutHouse";



function App() {
  const { loading } = useSelector((store) => store.loading);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  

  const [start, setStart] = useState(false);

  useStart({dispatch, setStart});

  return (
    <div className="App">
    <img className="base-fon" src="/tele.jpg" alt="img" />
    <div className="base-fon"></div>
  {/* <FileUpload /> */}
      {user ? (
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<LocationList />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/location/:locationId" element={<AboutLocation/>}/>
            <Route path="/location/:locationId/house/:houseId" element={<AboutHouse/>}/>
          </Route>
        </Routes>
        
      ) 
      : start && <Auth/> }
      {loading && <Loading/>}
    </div>
  );
}

export default App;
