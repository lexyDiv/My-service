const initialState = {
  crumbs: [
    {
      path: "/",
      name: "БАЗЫ",
      id: 0,
      index: 0,
    },
  ],
};

const crumbsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT":
      return {
        ...state,
        crumbs: state.crumbs.slice(0, action.payload + 1),
      };
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
