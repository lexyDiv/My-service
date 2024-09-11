const initialState = {
  main: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MAIN":
      return {
        main: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
