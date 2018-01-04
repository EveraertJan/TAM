import React, { Component } from 'react'
import { css } from 'glamor'

import { Router, Route } from 'react-router';


import LoginApp from './Login/LoginApp'
import RegisterApp from './Register/RegisterApp'
import MVPExpl from './MVPExpl'

const LandingContainer = css({
  width:  '100%',
  height: '500px',
  backgroundColor: '#eee'
})

class LandingApp extends Component {
  render() {
    return (
      <div>
        <div {...LandingContainer}>
          <Route path={'/'} exact component={LoginApp} />
          <Route path={'/register'} exact component={RegisterApp} />
        </div>
        <MVPExpl />
      </div>
    )
  }
}

export default LandingApp