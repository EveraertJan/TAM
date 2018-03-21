import React, { Component } from 'react';
import { css } from 'glamor'
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import MenuApp from './../General/MenuApp'
import ListApp from './List/ListApp'
import DetailApp from './Detail/DetailApp'

const container = css({
  width: '100%'
})

export default class PostApp extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div {...container}>
        <MenuApp />
        <Switch>
          <Route exact path='/posts/' component={ListApp}/>
          <Route path='/posts/:uuid' component={DetailApp}/>
      </Switch>
      </div>
    )
  }
}