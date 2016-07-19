import React from 'react';
import {render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import typeAhead from './reducers/typeAhead';
import thunk from 'redux-thunk';
import { checkTweet } from './middleware/tweetMiddleware'

import App from './containers/app';

const store = createStore(
  typeAhead,
  applyMiddleware(thunk, checkTweet)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
