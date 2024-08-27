const initialState = { locations: [] };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LOCATION":
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case "GET_LOCATIONS":
      return {
        ...state,
        locations: action.payload,
      };
    case "UPDATE_HOUSE_RENTS": {
      const location = state.locations.find(
        (el) => el.id === action.payload.locationId
      );
      if (location) {
        const house = location.Houses.find(
          (el) => el.id === action.payload.houseId
        );
        if (house) {
          house.Rents = action.payload.rents;
        }
      }
      return {
        ...state,
      };
    }
    case "UPDATE_RENT": {
      const location = state.locations.find(
        (el) => el.id === action.payload.location_id
      );
      if (location) {
        const house = location.Houses.find(
          (el) => el.id === action.payload.house_id
        );
        if (house) {
          house.Rents = house.Rents.map((rnt) => {
            if (rnt.id !== action.payload.id) {
              return rnt;
            }
            return action.payload;
          });
        }
      }
      return {
        ...state,
      };
    }
    case "DELETE_RENT": {
      const location = state.locations.find(
        (el) => el.id === action.payload.locationId
      );
      if (location) {
        const house = location.Houses.find(
          (el) => el.id === action.payload.houseId
        );
        if (house) {
          house.Rents = house.Rents.filter(
            (rent) => rent.id !== action.payload.rentId
          );
        }
      }
      return {
        ...state,
      };
    }
    case "ADD_RENT": {
      const location = state.locations.find(
        (el) => el.id === action.payload.locationId
      );
      if (location) {
        const house = location.Houses.find(
          (el) => el.id === action.payload.houseId
        );
        if (house) {
          house.Rents = [...house.Rents, action.payload.rent];
        }
      }
      return {
        ...state,
      };
    }
    case "ADD_RCOMMENT": {
      const location = state.locations.find(
        (loc) => loc.id === action.payload.locationId
      );
      if (location) {
        const house = location.Houses.find(
          (house) => house.id === action.payload.houseId
        );
        if (house) {
          const rent = house.Rents.find(
            (rent) => rent.id === action.payload.rentId
          );
          if (rent) {
            rent.Rcomments.push(action.payload.rComment);
            return {
              ...state,
            };
          }
        }
      }
      return state;
    }
    case "CHANGE_RCOMMENT": {
      const location = state.locations.find(
        (loc) => loc.id === action.payload.locationId
      );
      if (location) {
        const house = location.Houses.find(
          (house) => house.id === action.payload.houseId
        );
        if (house) {
          const rent = house.Rents.find(
            (rent) => rent.id === action.payload.rentId
          );
          if (rent) {
            let commentIndex = rent.Rcomments.findIndex(
              (comment) => comment.id === action.payload.comment.id
            );
            if (commentIndex !== -1) {
              rent.Rcomments[commentIndex] = action.payload.comment;
              return {
                ...state,
              };
            }
          }
        }
      }
      return state;
    }
    case "DELETE_RCOMMENT": {
      const location = state.locations.find(
        (loc) => loc.id === action.payload.locationId
      );
      if (location) {
        const house = location.Houses.find(
          (house) => house.id === action.payload.houseId
        );
        if (house) {
          const rent = house.Rents.find(
            (rent) => rent.id === action.payload.rentId
          );
          if (rent) {
            rent.Rcomments = rent.Rcomments.filter(
              (comment) => comment.id !== action.payload.commentId
            );
            return {
              ...state,
            };
          }
        }
      }
      return state;
    }
    case "UPDATE_LOCATION":
      return {
        ...state,
        locations: state.locations.map((location) => {
          if (location.id === action.payload.id) {
            return action.payload;
          }
          return location;
        }),
      };
    case "DELETE_LOCATION":
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload
        ),
      };
    case "ADD_HOUSE": {
      const location = state.locations.find(
        (lc) => lc.id === action.payload.location_id
      );
      if (location) {
        location.Houses.push(action.payload);
      }
      return {
        ...state,
      };
    }
    case "UPDATE_HOUSE": {
      const location = state.locations.find(
        (lc) => lc.id === action.payload.location_id
      );
      if (location) {
        location.Houses = location.Houses.map((house) => {
          if (house.id !== action.payload.id) {
            return house;
          }
          return action.payload;
        });
      }
      return {
        ...state,
      };
    }
    case "DELETE_HOUSE": {
      const location = state.locations.find(
        (lc) => lc.id === action.payload.location_id
      );
      if (location) {
        location.Houses = location.Houses.filter(house => house.id !== action.payload.id)
      }
      return {
        ...state
      }
    }

    default:
      return state;
  }
};

export default locationsReducer;
