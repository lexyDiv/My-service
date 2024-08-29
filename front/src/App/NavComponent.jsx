import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Main from "../components/main/Main";
import Clients from "../components/clients/Clients";
import AboutClient from "../components/aboutClient/AboutClient";
import LocationList from "../components/locationList/LocationList";
import Chat from "../components/chat/Chat";
import AboutLocation from "../components/aboutLocation/AboutLocation";
import AboutHouse from "../components/aboutHouse/AboutHouse";
import AboutRent from "../components/aboutRent/AboutRent";
import Quick from "../components/quick/Quick";
import Users from "../components/users/Users";
import UserAccount from "../components/userAccount/UserAccount";

const NavComponent = function ({ user }) {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Main />} />
        <Route path="/user-account" element={<UserAccount />} />
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
        />
      </Route>
    </Routes>
  );
};

export default NavComponent;
