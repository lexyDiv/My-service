import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Main from "../components/main/Main";
import Authentification from "../components/authentification/Authentification";

const NavComponent2 = function() {
    return (
        <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Main />} />
          <Route path="/authentification" element={<Authentification/>}/>
          {/* <Route path="/user-account" element={<UserAccount />} />
          <Route path="/quick" element={<Quick />} />
          <Route path="/users" element={<Users />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/client/:clientId" element={<AboutClient />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/locations/location/:locationId"
            element={<AboutLocation />}
          />
          <Route
            path="/locations/location/:locationId/house/:houseId"
            element={<AboutHouse />}
          />
          <Route
            path="/locations/location/:locationId/house/:houseId/rent/:rentId"
            element={<AboutRent />}
          /> */}
        </Route>
      </Routes>
    )
}

export default NavComponent2;