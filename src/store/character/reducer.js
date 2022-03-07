const initialState = {
  characters: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "character/charactersFetched": {
      console.log("charactersFetched", action);
      return {
        ...state,
        characters: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
