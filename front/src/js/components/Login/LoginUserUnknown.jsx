import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from './../../actions/UserActions';



class LoginUserUnknown extends Component {
	constructor(props) {
		super(props);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handlemailChange = this.handlemailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			usermail: null,
			password: null
		}
	}
	handlePassChange(e){
		this.setState({
			password: e.target.value
		})
	}
	handlemailChange(e){
		this.setState({
			usermail: e.target.value
		})
	}
	handleSubmit() {
		this.props.login(this.state)
	}
	render(){
		return(
			<div>
					<div className="fieldInputWrap">
						<label htmlFor="email">Email</label>
						<div className="formError">please fill out</div>
						<input type="text" name="email" onChange={this.handlemailChange} placeholder="john@doe.com" id="emailHolder" />
					</div>
					<div className="fieldInputWrap">
						<label htmlFor="password">password</label>
						<div className="formError">please fill out</div>
						<input type="password" onChange={this.handlePassChange} name="password" placeholder="password" id="passwordHolder" />
						<Link to="forgotPassword" className="formCTA">forgot password</Link>
					</div>
					<Link to="register" className="secundaryCTA">register</Link>
					<a className="primaryCTA" onClick={this.handleSubmit}>Log in</a>
			</div>
		)
	}
}

export default connect(state => {
	return {}
}, dispatch => {
 return {
 	  login: (payload) => dispatch(loginAction(payload))
 }
})(LoginUserUnknown);