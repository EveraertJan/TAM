/** @format */

import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import reducers from './js/Reducers/';
import sagas from './js/Sagas/';

import MenuApp from "./js/components/Menu/MenuApp";
import HomeApp from './js/components/Home/HomeApp';

const history = createBrowserHistory();

const container = css({
  minHeight: '100vh',
  width: '100%',
  display: 'block',
  backgroundColor: '#eee'
})

const sagaMiddleware = createSagaMiddleware()
let store = createStore(reducers, applyMiddleware(Logger), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)



ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div {...container}>
        <div className="u-full-width">
          <MenuApp />
          <Route path='/' component={HomeApp} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
