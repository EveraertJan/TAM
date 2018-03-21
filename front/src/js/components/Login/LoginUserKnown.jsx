import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginUserKnown extends Component {
	render(){
		return (
			<div className="row">
				<img src="#" className="loginProfilePicture row" />
				<form onSubmit={this.submithandler}>
					<div className="row">
						<label htmlFor="password">password</label>
						<input type="password" name="password" placeholder="password" />
					</div>
					<div className="row">
						<input type="submit" name="submit" value="log in" />
					</div>
				</form>
			</div>
		)
	}
}
export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(LoginUserKnown);