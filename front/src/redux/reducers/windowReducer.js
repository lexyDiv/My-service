const initialState = {
  wHeight: window.innerHeight,
  wWidth: window.innerWidth,
};

const windowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESIZE": {
      return {
        ...state,
        wHeight: window.innerHeight,
        wWidth: window.innerWidth,
      };
    }
    default:
      return state;
  }
};

export default windowReducer;
