import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'


class LogoutApp extends Component {
	
	getInitialState(){
		localStorage.setItem("token", null);
		return {
			token: localStorage.getItem("token")
		}
	}


	render(){
		console.log(this.state);
		return (
			<div className="confirmContainer">
				<p>You are now logged out</p>
				<Link to="login" className="primaryCTA">Login</Link>
			</div>
		)
	}
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(LogoutApp);