import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (

      <div>
        <h1>Success</h1>
        <Link to="login" className="primaryCTA">log in</Link>
      </div>
    )
  }
}

export default connect(state => {
  return {}
}, dispatch => {
  return {
  }
})(RegisterForm);