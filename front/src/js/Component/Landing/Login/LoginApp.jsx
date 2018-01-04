import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const LoginContainer = css({
  width: '300px',
  position: 'relative',
  left: 'calc(50% - 150px)',
  backgroundColor: '#fff',
  top: '50px',
  padding: '20px',
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  float: 'left'
})

const formField = css({
  marginBottom: '20px',
  '> label': {
    width: '100%',
    display: 'block',
  },
  '> input': {
    display: 'block',
    padding: '7px 10px',
    boxSizing: 'border-box',
    width: '100%',
    marginTop: '10px'
  }
})

const cta = css({
  padding: '10px',
  backgroundColor: '#E58585',
  color: '#fff',
  margin: '0px 0px 0px 5px',
  float: 'right'
})
const ctaSecundary = css({
  padding: '10px',
  color: '#E58585',
  backgroundColor: '#fff',
  margin: '0px 0px 0px 5px',
  float: 'right'
})


class LoginApp extends Component {
  constructor() {
    super()
  }
  render() {
  
    return (
      <div {...LoginContainer}>
        <form>
          <div {...formField}>
            <label htmlFor='login'>email</label>
            <input type='email' name='login' placeholder='email' autoComplete='email' />
          </div>
          <div {...formField}>
            <label htmlFor='password'>password</label>
            <input type='password' name='password' placeholder='password' autoComplete='current-password' />
          </div>
          <div {...formField}>
            <a {...cta}>Login</a>
            <Link to={`/register`} {...ctaSecundary}>register</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginApp;