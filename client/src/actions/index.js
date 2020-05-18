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

export const searchBarInputChange = (input) => {
  return { type: 'CHANGE_USER_SB_INPUT', payload: input };
};

export const updatePokemonSelected = (numberID) => {
  return { type: 'UPDATE_POKEMON_SELECTED', payload: numberID };
};

export const landingIsActive = (value) => {
  return { type: 'LANDING_IS_ACTIVE', payload: value };
};

export const getPokedex = (nextBatch, pokemons) => async dispatch => {
  dispatch({
    type: 'GET_POKEDEX'
  });

  try {
    const response = await API.getPokedex(nextBatch, pokemons);

    if (response.error) {
      dispatch({
        type: 'GET_POKEDEX_DATA_FAIL',
        payload: response.errorMsg
      });
      return; // salir de la accion
    }

    dispatch({
      type: 'GET_POKEDEX_DATA_SUCCESSFUL',
      payload: { previews: response.previews, nextBatch: response.nextBatch }
    });

  } catch (e) {
    console.log(e);
    dispatch({
      type: 'GET_POKEDEX_DATA_FAIL',
    });
  }
};

export const getPokemonTypes = () => async dispatch => {
  dispatch({
    type: 'GET_POKEMON_TYPES'
  });

  try {
    const response = await API.getTypes();
    console.log(response)
    if (response.error) {
      dispatch({
        type: 'GET_POKEMON_TYPES_FAIL',
        payload: response.errorMsg
      });
      return; // salir de la accion
    }
  
    dispatch({
      type: 'GET_POKEMON_TYPES_SUCCESSFUL',
      payload: response.types
    });

  } catch (e) {
    console.log(e);
    dispatch({
      type: 'GET_POKEMON_TYPES_FAIL'
    });
  }
};

export const getPokemon = (id) => async dispatch => {
  console.log(id);
  dispatch({
    type: 'GET_POKEMON'
  });

  try {
    const response = await API.getPokemon(id);

    if (response.error) {
      dispatch({
        type: 'GET_POKEMON_FAIL',
        payload: response.errorMsg
      });
      return; // salir de la accion
    }
  
    dispatch({
      type: 'GET_POKEMON_SUCCESSFUL',
      payload: response.pokemon
    });

  } catch (e) {
    console.log(e);
    dispatch({
      type: 'GET_POKEMON_FAIL'
    });
  }
};