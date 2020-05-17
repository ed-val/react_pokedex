const INITIAL_STATE = {
  surveysList: [],
};

export default function(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case 'FETCH_SURVEYS':
      return { ...state };
    case 'FETCH_SURVEYS_SUCCESS': {
      return { ...state, surveysList: action.payload };
    }
    case 'FETCH_SURVEYS_FAIL':
      return { ...state };
    default:
      return state;
  }
}
