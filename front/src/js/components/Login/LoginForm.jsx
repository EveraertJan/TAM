import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from './../../actions/UserActions';
import { Field, reduxForm, formValueSelector } from 'redux-form'


// outside your render() method
const renderField = (field) => (
    <div className="input-row">
      <input {...field.input} type={field.type} placeholder={field.placeholder}/>
      {field.meta.touched && field.meta.error &&
       <span className="error">{field.meta.error}</span>}
    </div>
  )



class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit() {
		console.log(this.props.fieldValues)

		this.props.login(this.props.fieldValues)
	}
	render(){
		console.log(this.props)
		return(
			<div>
				<form>
					<div className="fieldInputWrap">
						<label htmlFor="email">Email</label>
						<div className="formError">please fill out</div>
						<Field component={renderField} type="text" name="username" placeholder="john@doe.com" />
					</div>
					<div className="fieldInputWrap">
						<label htmlFor="password">password</label>
						<div className="formError">please fill out</div>
						<Field component={renderField} type="password" name="password" placeholder="password" />
						<Link to="forgotPassword" className="formCTA">forgot password</Link>
					</div>
					<Link to="register" className="secundaryCTA">register</Link>
					<a type="submit" className="primaryCTA" onClick={this.handleSubmit}>Log in</a>
				</form>
			</div>
		)
	}
}

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginForm)

const selector = formValueSelector('login')

export default connect(state => {
	return {
		fieldValues: selector(state, 'username', 'password')
	}
}, dispatch => {
 return {
 	  login: (payload) => dispatch(loginAction(payload))
 }
})(LoginForm);



