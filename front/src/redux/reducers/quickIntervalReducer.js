const initialState = {
  quickInterval: null,
};

const quickIntervalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INTERVAL":
      return {
        ...state,
        quickInterval: action.payload,
      };
    default:
      return state;
  }
};

export default quickIntervalReducer;
