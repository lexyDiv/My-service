const initialState = { locations: [] };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATIONS":
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
};

export default locationsReducer;