import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Main from "../components/main/Main";
import Authentification from "../components/authentification/Authentification";
import NotFound from "../components/notFound/NotFound";
import Registration from "../components/registration/Registration";

const NavComponent2 = function() {
    return (
        <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Main />} />
          <Route path="/authentification" element={<Authentification/>}/>
          <Route path="/registration" element={<Registration/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
}

export default NavComponent2;