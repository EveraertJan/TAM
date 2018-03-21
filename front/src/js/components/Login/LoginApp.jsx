import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Router, Route } from 'react-router';
import { container } from 'glamor/ous';
import { css } from 'glamor'

import LoginUserUnknown from './LoginUserUnknown';
import LoginSuccess from './LoginSuccess';

const loginContainer = css({
  width: '300px',
  marginTop: '100px',
  float: 'right',
  backgroundColor: '#fff',
  padding: '20px',
  boxSizing: 'border-box'
})

class LoginApp extends Component {
  
	render(){
		return(
      <div {...container}>
        <div {...loginContainer}>
          { this.props.user.login.success ?
            <LoginSuccess /> :
    				<LoginUserUnknown /> 
          }
        </div>
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
 }
})(LoginApp);