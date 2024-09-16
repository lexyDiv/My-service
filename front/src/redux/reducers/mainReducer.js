const initialState = {
  main: null,
  activate: false,
  interval: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INTERVAL":
      return {
        ...state,
        interval: true
      }
    case "ACTIVATE":
      return {
        ...state,
        activate: true
      }
    case "SET_MAIN":
      return {
        main: action.payload,
        activate: false,
      };
    default:
      return state;
  }
};

export default mainReducer;
