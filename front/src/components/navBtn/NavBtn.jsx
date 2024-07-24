import React from "react";
import './NavBtn.css';

const NavBtn = function({ text, cb }) {
    return (
        <div className="nav-btn"
        onClick={cb}
        >
            <div className="nav-btn-data">
               {text}
            </div>
           <img className="nav-btn-vector" src="/vector.png" alt="img" />
        </div>
    )
}

export default NavBtn;