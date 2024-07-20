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
import { useEffect } from "react";

function App() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch({ type: "GET_USER", payload: { name: "papa loh" } });
     fetch("/users")
     .then(res => res.json())
     .then(data => console.log(data))
     .catch(err => console.log(err))
  }, [dispatch]);

 // console.log(user);

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<FileUpload />} />
            <Route path="/papa" element={<Calendar1 />} />
          </Route>
        </Routes>
      ) : (
        <h1>Fuck you</h1>
      )}
    </div>
  );
}

export default App;
