import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import RegisterSuccess from './RegisterSuccess';

class RegisterApp extends Component {
	constructor(props) {
		super(props);
		
	}
	render(){
		return (

			<div className=" container registerContainer">
				{
					this.props.user.register.success ? 
						<RegisterSuccess />
						:
						<RegisterForm />
				}
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
})(RegisterApp);