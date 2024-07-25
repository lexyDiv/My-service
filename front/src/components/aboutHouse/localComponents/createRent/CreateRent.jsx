import React from "react";
import './CreateRent.css'
import RentCalendar from "./localComponents/rentCalendar/RentCalendar";

const CreateRent = function({ house, user, location }) {
  
    return (
        <div id="create-rent">
          <RentCalendar house={house} user={user} location={location}/>
        </div>
    )
}

export default CreateRent;