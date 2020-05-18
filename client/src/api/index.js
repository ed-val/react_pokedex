import axios from 'axios';
import Helpers from './helpers';

import { BASE_API } from './config';

class Api {
  async getPokedex(nextBatch, pokemons = []) {
    const url = nextBatch || `${BASE_API}/api/v2/pokemon/?limit=20&offset=0`;
    let result = null;

    try {
      const res = await axios({ method: 'GET', url });

      console.log(res);
      if (res.data.results.length > 0) {
        const previews = Helpers.buildPokemonsPreviews(res.data.results);
        // keep adding pokemons with each req instead of reseting the list
        result = { previews: [...pokemons, ...previews], nextBatch: res.data.next }
      } else {
        result = { error: true, errorMsg: 'No hay resultados' };
      }
      
    } catch (e) {
      console.log(e);
      if (e.message.match(/Network request failed/)) {
        result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
      } else {
        // por ahora tratar todos los errores con un mensaje generico
        result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
      }
    }

    return result;
  }

  async getTypes() {
    let result = null;
    try {
      const res = await axios({
        method: 'GET',
        url: `${BASE_API}/api/v2/type/`
      });
  
      if (res.data.results.length > 0) {
        const types = Helpers.buildPokemonsTypes(res.data.results);
        result = { types, error: false };
        } else {
          result = { error: true, errorMsg: 'No hay resultados' };
        }
        
      } catch (e) {
        console.log(e);
        if (e.message.match(/Network request failed/)) {
          result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
        } else {
          // por ahora tratar todos los errores con un mensaje generico
          result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
        }
      }

    return result;
  }

  async getPokemon(id) {
    let result = null;
    try {
      const resDetails = await axios({
        method: 'GET',
        url: `${BASE_API}/api/v2/pokemon/${id}`
      });

      if (!!resDetails.data) {
        const resCharacteristics = await axios({
          method: 'GET',
          url: `${BASE_API}/api/v2/pokemon-species/${resDetails.data.id}`
        });
      
        const pokemon = Helpers.buildPokemon(
          resDetails.data,
          resCharacteristics.data
        );
        result = { error: false, pokemon };
      } else {
        result = { error: true, errorMsg: 'No hay resultados' };
      }
        
      } catch (e) {
        console.log(e);
        if (e.message.match(/Network request failed/)) {
          result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
        } else {
          // por ahora tratar todos los errores con un mensaje generico
          result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
        }
      }

    return result;
  }
}

export default new Api();
