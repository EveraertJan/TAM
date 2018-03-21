import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import {container} from 'glamor/ous'

import { verifyUserToken } from './../../actions/UserActions'


import LoginApp from "./..//Login/LoginApp";
import RegisterApp from "./..//Register/RegisterApp";

import PostApp from './../Post/PostApp'

import UserApp from './../User/UserApp';

class HomeApp extends Component {
  componentDidMount() {
    if(document.cookie){
      const token = this.getCookie("jwt")
      if(token !== "null") {
        this.props.verifyUser(token);
      } else {
        console.log('no token')
      }
    }
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  render(){
    return(
      <div {...container}>
        { this.props.user.loggedIn.uuid ? 
          <Switch>
            <Route path='/User' component={UserApp} />
            <Route exact path='/login' component={LoginApp} />
            <Route path='/' component={PostApp} />
          </Switch>
        :
          <Switch>
            <Route exact path='/login' component={LoginApp} />
            <Route exact path='/register' component={RegisterApp} />
            <Route path='/' component={LoginApp} />
          </Switch>

        }
      </div>
      
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
 return {
  verifyUser: (token) => dispatch(verifyUserToken(token))
 }
})(HomeApp);