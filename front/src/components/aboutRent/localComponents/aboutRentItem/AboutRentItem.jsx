import React from "react";
import './AboutRentItem.css'

const AboutRentItem = function({ rent, location, house }) {
    const rentDays = JSON.parse(rent.days);
    console.log(rent.updatedAt);
    return (
        <div id="about-rent-item">
          <div id="about-rent-item-date">
          <div className="hr"/>
            <p>Статус :</p>
            <h5 className="about-rent-data"
            style={{
                color: `${rent.type === 'go' ? "red" : "yellow"}`
            }}
            >{rent.type === 'go' ? "Сдано" : "Забронировано"}</h5>
            <div className="hr"/>
            <p>Название базы :</p>
            <h5 className="about-rent-data">{location.name}</h5>
            <div className="hr"/>
            <p>Название дома :</p>
            <h5 className="about-rent-data">{house.name}</h5>
            <div className="hr"/>
            <p>Адрес дома :</p>
            <h5 className="about-rent-data">{house.address}</h5>
            <div className="hr"/>
            <p>Дата создания :</p>
            <h5 className="about-rent-data">{rent.date}</h5>
            <div className="hr"/>
            <p>Дата последнего редактирования:</p>
            <h5 className="about-rent-data"></h5>
            <div className="hr"/>
            <p>C</p>
            <h5 className="about-rent-data">{rentDays[0]}</h5>
          </div>
        </div>
    )
}

export default AboutRentItem;