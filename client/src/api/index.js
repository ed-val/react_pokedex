import axios from 'axios';

import { BASE_API } from './config';

class Api {
  async getPokedex(id) {
    // let result = null;
    try {
      const data = await axios({
        method: 'GET',
        url: `${BASE_API}/api/v2/pokemon/1/`
      });

      console.log(data);

      // validacion de errores
      // if (!data.error) {
      //   result = data;
      // } else {
      //   result = { error: true, errorMsg: 'Se conecto al servidor pero hay error.' };
      // }
    } catch (e) {
      console.log(e);
      if (e.message.match(/Network request failed/)) {
        // result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
      } else {
        // por ahora tratar todos los errores con un mensaje generico
        // result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
      }
    }

    // return result;
  }

  async getTypes(id) {
    // let result = null;
    try {
      const data = await axios({
        method: 'GET',
        url: `${BASE_API}/api/v2/type/`
      });

      console.log(data);

      // validacion de errores
      // if (!data.error) {
      //   result = data;
      // } else {
      //   result = { error: true, errorMsg: 'Se conecto al servidor pero hay error.' };
      // }
    } catch (e) {
      console.log(e);
      if (e.message.match(/Network request failed/)) {
        // result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
      } else {
        // por ahora tratar todos los errores con un mensaje generico
        // result = { error: true, errorMsg: 'Error al conectarse con el servidor.' };
      }
    }

    // return result;
  }
}

export default new Api();
