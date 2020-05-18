const INITIAL_STATE = {
  user: false,
  landingIsActive: false,
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
    case 'LANDING_IS_ACTIVE': {
      return { ...state, landingIsActive: action.payload };
    }
    default:
      return state;
  }
}
