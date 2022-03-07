const initialState = {
  characters: null,
  characterDetails: null,
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
    case "character/characterFetched": {
      return {
        ...state,
        characterDetails: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
