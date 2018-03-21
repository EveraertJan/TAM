import React, { Component } from 'react';
import { css } from 'glamor'

const childLinkBox = css({
  width: '20px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: '#aaa',
  float: 'left',
  marginLeft: '5px'
})

export default class UserBox extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div {...childLinkBox}>
      </div>
    )
  }
}