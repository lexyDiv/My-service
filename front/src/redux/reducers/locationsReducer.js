const initialState = { locations: [] };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default locationsReducer;
