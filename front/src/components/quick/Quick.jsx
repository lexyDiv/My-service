import React, { useState } from "react";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./Quick.css";
import QuickFilter from "./localComponents/quickFilter/QuickFilter";
import QuickCalendar from "./localComponents/quickCalendar/QuickCalendar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { quickFetch } from "./functions/quickFetch";
import House from "../house/House";

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

  const [houses, setHouses] = useState([]);

  const [filterMessage, setFilterMessage] = useState("");
  const dispatch = useDispatch();

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
        setHouses={setHouses}
        setFilterMessage={setFilterMessage}
      />
      {newInterval.startTime && newInterval.endTime && (
        <Button
          onClick={() =>
            quickFetch({
              newInterval,
              filterPunkt,
              setHouses,
              setFilterMessage,
              dispatch,
            })
          }
          sx={{}}
          variant="outlined"
        >
          найти свободные дома
        </Button>
      )}
      {filterMessage && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            color: "orange",
            marginTop: "15px",
          }}
        >
          <h5>{filterMessage}</h5>
        </div>
      )}
      {houses.length ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            color: "rgb(25, 252, 25)",
            marginTop: "15px",
          }}
        >
          <p>Найдено домов:</p>
          <h5
            style={{
              marginLeft: "10px",
            }}
          >
            {houses.length}
          </h5>
        </div>
      ) : (
        false
      )}
      {houses.map((house) => (
        <House key={house.id} house={house} newInterval={newInterval} />
      ))}
    </div>
  );

  return (
    <div id="quick">
      <QuickFilter
        filterOptions={filterOptions}
        filterPunkt={filterPunkt}
        setFilterPunkt={setFilterPunkt}
        label={"Искать в"}
        setHouses={setHouses}
      />
      <ScrollContainer contCallBack={contCallBack} localPage={localPage} />
    </div>
  );
};

export default Quick;
