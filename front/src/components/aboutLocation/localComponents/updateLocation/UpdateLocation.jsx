import React from "react";
import './UpdateLocation.css';

const UpdateLocation = function({ location }) {
    return (
        <div id="update-location">
            this.is update location
            {location.name}
        </div>
    )
}

export default UpdateLocation;