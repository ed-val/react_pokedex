
import 'materialize-css/dist/css/materialize.min.css';
// up here, in the path, if you dont use './' that is to say that if you dont
// specify a relative path, webpack will assume you are referring to a npm module
// and will automatically look inside the node_modules folder
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
const axios = require('axios');
window.axios = axios; //this basically enabled the axios library and all its methods
// inside the devtools of chrome so we could make request with cookies included

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('ENVIROMENT IS', process.env.NODE_ENV);
