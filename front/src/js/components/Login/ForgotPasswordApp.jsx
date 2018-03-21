import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ForgotPasswordApp extends Component {

	render(){
		return (
			<div className="confirmContainer">
				<p>We have send an email to reactivate your account. Do not share this email with anyone.</p>
				<Link to="login" className="primaryCTA">Back to login</Link>
			</div>
		)
	}
}
export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(ForgotPasswordApp);
