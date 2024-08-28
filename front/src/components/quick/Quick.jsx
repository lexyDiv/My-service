import React, { useState } from "react";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./Quick.css";
import QuickFilter from "./localComponents/quickFilter/QuickFilter";
import QuickCalendar from "./localComponents/quickCalendar/QuickCalendar";
import { useSelector } from "react-redux";

const Quick = function () {
  const localPage = "quick";

  const { locations } = useSelector((store) => store.locations);

  const filterOptions = ["Все локации", ...locations.map((l) => l.name)];

  const [filterPunkt, setFilterPunkt] = useState(filterOptions[0]);

  const contCallBack = (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        
    }}>
      <QuickFilter
        filterOptions={filterOptions}
        filterPunkt={filterPunkt}
        setFilterPunkt={setFilterPunkt}
        label={"Искать в"}
      />
      <QuickCalendar />
    </div>
  );

  return (
    <div id="quick">
      <ScrollContainer contCallBack={contCallBack} localPage={localPage} />
    </div>
  );
};

export default Quick;
