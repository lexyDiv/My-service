import React from "react";
import Calendar2 from "../../../Calendars/Calendar2";
import './CreateRent.css'
import RentCalendar from "./localComponents/rentCalendar/RentCalendar";

const CreateRent = function({ house, user }) {
  
    return (
        <div id="create-rent">
          <RentCalendar house={house} user={user}/>
        </div>
    )
}

export default CreateRent;