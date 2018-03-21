/** @format */

import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import logger from './js/logger';
import reducers from './js/Reducers/';
import sagas from './js/Sagas/';

import LandingApp from './js/Component/Landing/LandingApp'
import NoMatch from './js/Component/General/NoMatch'
import PostApp from './js/Component/Post/PostApp'

const history = createBrowserHistory();
logger('foo');
const loggerMiddleWare = createLogger({
  logger:{log:logger('redux-logger')},
  collapsed:true
});



const container = css({
  minHeight: '100vh',
  width: '100%',
  display: 'block'
})

const sagaMiddleware = createSagaMiddleware()
let store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div {...container}>
        <Route path="/posts" component={PostApp} />
        <Route exact path="/" component={LandingApp} />
        <Route exact path="/register" component={LandingApp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
