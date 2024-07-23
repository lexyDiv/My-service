import React from "react";
import Calendar1 from "../Calendars/Calendar1";
import ShowCalendar from "../showCalendar/ShowCalendar";

const House = function({ house }) {
    return (
        <div className="card" 
         style={{maxWidth: '50rem', margin: '15px', padding: '5px'}}
        >
  <img src={house.image} className="card-img-top" alt="img" />
  <div className="card-body">
    <h5 className="card-title">{house.name}</h5>
    <p className="card-text">{house.address}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">An item</li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
 <ShowCalendar/>
 
          <div className="card-body">
          <button type="button" className="btn btn-primary"
         // onClick={onBase}
          >
            В дом
          </button>
          </div>
</div>
    )
}

export default House;