import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

import { registerUserAction } from './../../actions/UserActions';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.state = {
      values: {}
    }
  }
  handleSubmit(){
    console.log(this.state.values)
    this.props.register(this.state.values)
  }
  displayErrors(){
    return ""
  }
  onFieldChange(e, field) {
    const curState = this.state;
    curState['values'][field] = e.target.value;
    this.setState(curState)
  }
  render(){
    return (

      <div>
        <div className="userImage">
          <img src="#" />
          
          <a href="#" className="imageAdd"><div className="icon filter-image-inactive"></div></a>
        </div>
        <div className="fieldInputWrap">
          <label htmlFor="name_first">First name</label>
          <div className="formError" id="nameFirstError">please fill out</div>
          <input type="text" id="nameFirstInput" name="name_first" placeholder="John" onChange={(e) => this.onFieldChange(e, 'name_first') } />
        </div>
        <div className="fieldInputWrap">
          <label htmlFor="name_last">Last name</label>
          <div className="formError" id="nameLastError">please fill out</div>
          <input type="text" id="nameLastInput" name="name_last" placeholder="Doe" onChange={(e) => this.onFieldChange(e, 'name_last') } />
        </div>
        <div className="fieldInputWrap">
          <label htmlFor="email">Email</label>
          <div className="formError" id="nameError">please fill out</div>
          <input type="text" id="emailInput" name="email" placeholder="john@doe.com"  onChange={(e) => this.onFieldChange(e, 'usermail') }/>
        </div>
        <div className="fieldInputWrap">
          <label htmlFor="dob">Date of Birth</label>
          <div className="formError" id="nameError">please fill out</div>
          <input type="date" id="dobInput" name="dob" placeholder="Date of birth" onChange={(e) => this.onFieldChange(e, 'date_of_birth') } />
        </div>
        <div className="fieldInputWrap">
          <label htmlFor="password">password</label>
          <div className="formError" id="passwordError">please fill out</div>
          <input type="password" name="password" placeholder="password" id="passwordInput" onChange={(e) => this.onFieldChange(e, 'password') }  />
        </div>
        <div className="fieldInputWrap">
          <div className="checkboxElement">
              <input type="checkbox" onChange={this.togglePassWord} /> I have read the <a>terms and conditions</a>
            </div>

        </div>
        <Link to="login" className="secundaryCTA">log in</Link>
        <a className="primaryCTA" onClick={this.handleSubmit}>Register</a>
      </div>
    )
  }
}

export default connect(state => {
  return {}
}, dispatch => {
  return {
    register: (payload) => dispatch(registerUserAction(payload))
  }
})(RegisterForm);