import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

class LoginSuccess extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props)
    if(this.props.user.login.token) {
      document.cookie = `jwt=${this.props.user.login.token}`
    }
  }
  render(){


    return (

      <div className="row">
        <h1>Success</h1>
        <Link to="/" className="primaryCTA">Get started</Link>
      </div>
    )
  }
}

export default connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
  return {
  }
})(LoginSuccess);