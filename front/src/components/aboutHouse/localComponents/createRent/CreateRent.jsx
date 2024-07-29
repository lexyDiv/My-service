import React, { useState } from "react";
import './CreateRent.css'
import RentCalendar from "./localComponents/rentCalendar/RentCalendar";

const CreateRent = function({ house, user, location }) {

  const [focusRent, setFocusRent] = useState(null);
  
    return (
        <div id="create-rent">
          <RentCalendar house={house} user={user} location={location}/>
         
        </div>
    )
}

export default CreateRent;