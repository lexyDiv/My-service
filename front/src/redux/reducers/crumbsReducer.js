const initialState = {
  crumbs: [
    {
      path: "/",
      name: "БАЗЫ",
      id: 0,
    },
  ],
};

const crumbsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        crumbs: [...state.crumbs, action.payload],
      };
    case "FIRST":
      return {
        ...state,
        crumbs: action.payload,
      };
    default:
      return state;
  }
};

export default crumbsReducer;
