import React from "react";
import './RentItem.css';

const RentItem = function ({ rent }) {
    return (
        <div className="rent-item">
            <h1>{rent.id}</h1>
        </div>
    )
}

export default RentItem;