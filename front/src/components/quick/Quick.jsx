import React, { useState } from "react";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./Quick.css";
import QuickFilter from "./localComponents/quickFilter/QuickFilter";
import QuickCalendar from "./localComponents/quickCalendar/QuickCalendar";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { quickFetch } from "./functions/quickFetch";

const Quick = function () {
  const localPage = "quick";

  const { locations } = useSelector((store) => store.locations);

  const filterOptions = [
    { name: "Все локации", id: 0 },
    ...locations.map((l) => ({ name: l.name, id: l.id })),
  ];

  const [filterPunkt, setFilterPunkt] = useState(filterOptions[0].id);

  const [newInterval, setNewInterval] = useState({
    startTime: 0,
    endTime: 0,
  });

  const [ houses, setHouses ] = useState([]);

  const contCallBack = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <QuickCalendar
        newInterval={newInterval}
        setNewInterval={setNewInterval}
      />
      {newInterval.startTime && newInterval.endTime && (
        <Button
          onClick={() => quickFetch({ newInterval, filterPunkt })}
          sx={{}}
          variant="outlined"
        >
          найти свободные дома
        </Button>
      )}
      {/* {houses.map(house => )} */}
    </div>
  );

  return (
    <div id="quick">
      <QuickFilter
        filterOptions={filterOptions}
        filterPunkt={filterPunkt}
        setFilterPunkt={setFilterPunkt}
        label={"Искать в"}
      />
      <ScrollContainer contCallBack={contCallBack} localPage={localPage} />
    </div>
  );
};

export default Quick;
