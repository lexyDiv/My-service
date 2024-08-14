const initialState = {
  pagList: 1,
  allClientsLength: 0,
  clients: [],
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CLIENTS": {
      return {
        ...state,
        allClientsLength: action.payload.allClientsLength,
        clients: action.payload.clients,
      };
    }
    case "SET_PAGLIST": {
      return {
        ...state,
        pagList: action.payload
      }
    }
    default:
      return state;
  }
};

export default clientsReducer;
