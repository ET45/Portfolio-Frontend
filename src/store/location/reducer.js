const initialState = {
  locations: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "location/locationsFetched": {
      /* console.log("charactersFetched", action); */
      return {
        ...state,
        locations: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
