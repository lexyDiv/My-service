const initialState = { locations: [] };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATIONS":
      return {
        ...state,
        locations: action.payload,
      };
    case "ADD_RENT":
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
    default:
      return state;
  }
};

export default locationsReducer;
