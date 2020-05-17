const INITIAL_STATE = {
  searchBarInput: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_USER_SB_INPUT': {
      return { ...state, searchBarInput: action.payload };
    }
    default:
      return state;
  }
}
