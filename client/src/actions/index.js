import axios from 'axios';
import API from '../api';
// the syntax below is valid and used when the father fx only
// makes a single return and the children takes a single param
export const fetchUser = () => async dispatch => {
  dispatch({ type: 'FETCH_USER' });
  try {
    const res = await axios.get('api/current_user');
    if (res) dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data });
    if (!res) dispatch({ type: 'FETCH_USER_FAIL'});
  } catch (err) {
    console.log(err);
  }
};

export const handleToken = (token) => async dispatch => {
  dispatch({ type: 'FETCH_USER' });
  try {
    const res = await axios.post('/api/stripe', token);
    if (res) dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data });
    if (!res) dispatch({ type: 'FETCH_USER_FAIL'});
  } catch (err) {
    console.log(err);
  }
};

export const submitSurvey = (values, history) => async dispatch => {
  dispatch( { type: 'POST_SURVEY' });
  try {
    const res = await axios.post('/api/surveys', values);
    if (res) dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data });
    if (!res) dispatch({ type: 'FETCH_USER_FAIL'});
    history.push('/surveys');
  } catch (err) {
    console.log(err);
  }
};

export const fetchSurveys = () => async dispatch => {
  dispatch({ type: 'FETCH_SURVEYS' });
  try {
    const res = await axios.get('/api/surveys');
    if (res) dispatch({ type: 'FETCH_SURVEYS_SUCCESS', payload: res.data });
    if (!res) dispatch({ type: 'FETCH_SURVEYS_FAIL'});
  } catch (e) {
    console.log(e);
    dispatch({ type: 'FETCH_SURVEYS_FAIL', payload: e });
  }

};

export const searchBarInputChange = (input) => {
  return { type: 'CHANGE_USER_SB_INPUT', payload: input };
};

export const getPokedex = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_POKEDEX'
    });

    try {
      const responseLogin = await API.getPokedex(id);

      // if (response.error || responseLogin.error || responseRegisterDevice.error) {
      //   dispatch({
      //     type: 'GET_AUTH_DATA_FAIL',
      //     payload: response.errorMsg
      //   });
      //   return; // salir de la accion
      // }

      // dispatch({
      //   type: 'GET_AUTH_DATA_SUCCESSFUL',
      //   payload: responseLogin.token
      // });

      // dispatch({
      //   type: 'GET_USER_DATA_SUCCESSFUL',
      //   payload: response.data
      // });

      // NavigationService.navigate('Form'); // go go go
    } catch (e) {
      console.log(e);
      dispatch({
        type: 'GET_POKEDEX_FAIL'
      });
    }
  };
};

export const getPokemonTypes = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_POKEMON_TYPES'
    });

    try {
      const responseLogin = await API.getTypes(id);
    } catch (e) {
      console.log(e);
      dispatch({
        type: 'GET_POKEMON_TYPES_FAIL'
      });
    }
  };
};