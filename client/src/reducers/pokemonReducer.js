const INITIAL_STATE = {
  loading: false,
  requestError: false,
  errorMessage: '',
  details: '',  
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_POKEMON': {
      return { ...state, loading: true, errorMessage: '', requestError: false };
    }
    case 'GET_POKEMON_FAIL': {
      return { 
        ...state, 
        loading: false, 
        errorMessage: action.payload, 
        requestError: true,
      };
    }
    case 'GET_POKEMON_SUCCESSFUL': {
      return { 
        ...state, 
        loading: false,
        details: action.payload,
        errorMessage: '', 
        requestError: false,
      };
    }
    default:
      return state;
  }
}
