const initialState = {
  pagList: 0,
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
    default:
      return state;
  }
};

export default clientsReducer;
