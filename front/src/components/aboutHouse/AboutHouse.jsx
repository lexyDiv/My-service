import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AboutHouse = function() {

    const { locationId, houseId } = useParams();
    const { locations } = useSelector((store) => store.locations);
    
    const location = locations.find((el) => el.id === Number(locationId));

console.log(locationId);
console.log(houseId);

    return (
        <div>
         {houseId}
        </div>
    )
}

export default AboutHouse;