const pageReducer = (state = { page: 1 }, action) => {
  switch (action.type) {
    case "move":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default pageReducer;
