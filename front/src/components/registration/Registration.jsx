import React, { useState } from "react";
import './Registration.css'
import ScrollContainer from "../scrollContainer/ScrollContainer";
import AdminReg from "./localComponets/adminReg/AdminReg";

const Registration = function() {

    const [isAdmin, setIsAdmin] = useState(true);


const contCallBack = (
    isAdmin ? <AdminReg/> : <div>papa loh</div>
);

    return (
        <div id="registration">
<ScrollContainer contCallBack={contCallBack} localPage={"reg"} />
        </div>
    )
}

export default Registration;