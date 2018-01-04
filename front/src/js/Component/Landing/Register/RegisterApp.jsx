import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const RegisterContainer = css({
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

class RegisterApp extends Component {
  render() {
    return (
      <div {...RegisterContainer}>
        <form>
          <div {...formField}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' placeholder='Name' />
          </div>
          <div {...formField}>
            <label htmlFor='surname'>Surname</label>
            <input type='text' name='surname' placeholder='Surname' />
          </div>
          <div {...formField}>
            <label htmlFor='email'>email</label>
            <input type='email' name='email' placeholder='email' autoComplete='email' />
          </div>
          <div {...formField}>
            <label htmlFor='password'>password</label>
            <input type='password' name='password' placeholder='email' autoComplete='current-password' />
          </div>
          <div {...formField}>
            <a {...cta}>register</a>
            <Link to={'/'} {...ctaSecundary}>Login</Link>
          </div>
        </form> 
      </div>
    )
  }
}

export default RegisterApp;