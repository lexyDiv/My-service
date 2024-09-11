import React from "react";
import './MainUpdater.css';
import { useSelector } from "react-redux";

const MainUpdater = function() {

const { main } = useSelector(store => store.main);

    return (
        <div id="main-updater">
           this is main updater
        </div>
    )
}

export default MainUpdater;