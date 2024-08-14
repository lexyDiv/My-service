const initialState = {
  wHeight: window.innerHeight,
};

const windowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESIZE": {
      return {
        ...state,
        wHeight: action.payload,
      };
    }
    default:
      return state;
  }
};

export default windowReducer;
