const initialState = {
  characters: [],
  characterDetails: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "character/charactersFetched": {
      // console.log("charactersFetched", action);
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
    case "character/characterAdded": {
      console.log("state", state);
      return {
        ...state,
        characters: [...state.characters, action.payload.newCharacters],
      };
    }
    case "character/characterUpdated": {
      console.log("action; update action", action.payload);

      const { name, gender, hometown, image, skill } = action.payload;

      return {
        ...state,
        characterDetails: {
          name,
          gender,
          hometown,
          image,
          skill,
          ...state.characterDetails,
        },
      };
    }

    default: {
      return state;
    }
  }
}
