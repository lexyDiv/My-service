import axios from "axios";
class Reserv {
  constructor(startTime, endTime, type) {
    this.startDate = "a";//startDate;
    this.endDate = "b"; //endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.type = type;
    this.days = [];
  }
}

export function reservProg(setSelectedDates, date) {
  setSelectedDates((prev) => {
    if (prev.length === 2) {
      return [];
    }
    return [...prev, date];
  });
}

export async function addReserv(
  newInterval,
  setNewInterval,
  type,
  user,
  house,
  location,
  dispatch,
  setFocusRent,
  setGMessage,
) {
  dispatch({ type: "SET_LOADING", payload: true });

  const newRent = new Reserv(newInterval.startTime, newInterval.endTime, type);
  newRent.days = "";
  newRent.house_id = house.id;
  newRent.date = String(new Date().getTime());
  newRent.status = "";
  newRent.user_id = user.id;
  newRent.data = "polny pizdez";
  newRent.client_id = null;
  newRent.location_id = house.location_id;
  newRent.update_date = newRent.date;

  axios
    .post("/rent", newRent)
    .then((res) => {
      const { data } = res;
      if (data.message === "ok") {
        dispatch({
          type: "ADD_RENT",
          payload: {
            houseId: house.id,
            locationId: location.id,
            rent: data.newRent,
          },
        });
        setFocusRent(data.newRent);
      } else if (data.message === "sory") {
        setGMessage("Не удалось создать. Выбранный интервал оказался не свободным!");
        dispatch({
          type: "UPDATE_HOUSE_RENTS",
          payload: {
            houseId: house.id,
            locationId: location.id,
            rents: data.allHouseRents,
          },
        });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    })
    .catch((err) => {
      dispatch({ type: "SET_LOADING", payload: false });
      console(err);
    });
  setNewInterval({
    startTime: 0,
    endTime : 0,
  });
}
