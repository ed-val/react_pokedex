const INITIAL_STATE = {
  loading: false,
  requestError: false,
  errorMessage: '',
  pokemons: [],
  pokemonsTypes: [],
  nextBatch: '', //<- url returned by PokeAPI
  pokemonSelected: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_POKEDEX': {
      return { ...state, loading: true, errorMessage: '', requestError: false };
    }
    case 'GET_POKEDEX_DATA_FAIL': {
      return { 
        ...state, 
        loading: false, 
        errorMessage: action.payload, 
        requestError: true,
      };
    }
    case 'GET_POKEDEX_DATA_SUCCESSFUL': {
      return { 
        ...state, 
        loading: false,
        pokemons: action.payload.previews,
        nextBatch: action.payload.nextBatch, 
        errorMessage: '', 
        requestError: false,
      };
    }
    case 'GET_POKEMON_TYPES': {
      return { ...state, loading: true, errorMessage: '', requestError: false };
    }
    case 'GET_POKEMON_TYPES_FAIL': {
      return { 
        ...state, 
        loading: false, 
        errorMessage: action.payload, 
        requestError: true,
      };
    }
    case 'GET_POKEMON_TYPES_SUCCESSFUL': {
      return { 
        ...state, 
        loading: false,
        pokemonsTypes: action.payload, 
        errorMessage: '', 
        requestError: false,
      };
    }
    case 'UPDATE_POKEMON_SELECTED': {
      return { 
        ...state, 
        pokemonSelected: action.payload
      };
    }
    default:
      return state;
  }
}
