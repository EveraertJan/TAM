import React, { Component } from 'react';
import { css } from 'glamor'

import MenuLink from './Menu/MenuLink';
import ChildLink from './Menu/ChildLink';
import UserBox from './Menu/UserBox';

const menuContainer = css({
  height: '40px',
  boxSizing: 'border-box',
  padding: '10px 0px',
  lineHeight: '20px',
  backgroundColor: '#fff',
  position: 'fixed',
  top: '0px',
  width: '100vw',
  fontFamily: 'sans-serif'
})

const childContainer = css({
  float: 'left',
  width: 'calc(100vw/3)',
  padding: '0px 10px',
  boxSizing: 'border-box'
})
const linkContainer = css({
  float: 'left',
  width: 'calc(100vw/3)',
  textAlign: 'center'
})
const userContainer = css({
  float: 'left',
  width: 'calc(100vw/3)',
  textAlign: 'right',
  padding: '0px 10px',
  boxSizing: 'border-box'
})


export default class MenuApp extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div {...menuContainer}>
        <div {...childContainer}>
          <ChildLink content='' />
          <ChildLink content='' />
          <ChildLink content='' />
        </div>
        <div {...linkContainer}>
          <MenuLink content='TAM' />
        </div>
        <div {...userContainer}>
          <UserBox />
        </div>
      </div>
    )
  }
}