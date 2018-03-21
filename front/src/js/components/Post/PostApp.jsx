import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import {container} from 'glamor/ous'

import ListApp from './List/ListApp'
import UserListApp from './List/UserListApp'
import CreateApp from './Create/CreateApp'
import DetailApp from './Detail/DetailApp'

class PostApp extends Component {
  render(){
    return(

      <div>
        <Switch>
          <Route exact path='/create' component={CreateApp} />
          <Route exact path='/post/:uuid' component={DetailApp} />
          <Route exact path='/:uuid' component={UserListApp} />
          <Route exact path='/' component={ListApp} />
        </Switch>
      </div>
      
    );
  }
}

export default connect(state => {
  return {

  }
}, dispatch => {
 return {
 }
})(PostApp);