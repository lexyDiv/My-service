import React from "react";
import Calendar2 from "../../../Calendars/Calendar2";
import './CreateRent.css'

const CreateRent = function({ house, user }) {
    return (
        <div id="create-rent">
          <Calendar2/>
        </div>
    )
}

export default CreateRent;