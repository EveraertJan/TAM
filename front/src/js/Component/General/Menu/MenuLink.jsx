import React, { Component } from 'react';
import { css } from 'glamor'

export default class MenuLink extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    )
  }
}