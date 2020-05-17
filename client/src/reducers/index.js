import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; //<- this syntax is really useful
import surveysReducer from './surveysReducer';
import authReducer from './authReducer';
import headerReducer from './headerReducer';

export default combineReducers({
  auth: authReducer,
  header: headerReducer,
  form: reduxForm,
  surveys: surveysReducer,
});
