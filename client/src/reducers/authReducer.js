const INITIAL_STATE = {
  user: false
};

export default function(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case 'FETCH_USER': {
      return { ...state, user: action.payload || null };
    }
    case 'FETCH_USER_SUCCESS': {
      return { ...state, user: action.payload || false };
    }
    default:
      return state;
  }
}
