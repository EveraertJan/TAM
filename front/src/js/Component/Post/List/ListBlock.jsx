import React, { Component } from 'react';
import { css } from 'glamor'

import ListItem from './ListItem'

const container = css({
  width: '100%',
  float: 'left',
  marginBottom: '50px'
})

const postContainer = css({
  width: '100%',
  boxSizing: 'border-box',
  margin: '10px 0px 50px 0px'
})

const dateContainer = css({
  width: '100%',
  height: '40px',
  lineHeight: '20px',
  padding: '10px',
  boxSizing: 'border-box'
})

export default class UserBox extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div {...container}>
        <div {...dateContainer}>
          Date
        </div>
        <div {...postContainer}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </div>
      </div>
    )
  }
}