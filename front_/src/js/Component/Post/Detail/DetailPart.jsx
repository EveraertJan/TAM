import React, { Component } from 'react';
import { css } from 'glamor'
import { Link } from 'react-router-dom'

const container = css({
  width: '100%',
  float: 'left',
  backgroundColor: '#eee',
  height: '200px',
  marginTop: '50px'
})

const imgContainer = css({
  width: '100%',
  height: '150px'
})

export default class DetailPart extends Component {
  constructor() {
    super();
  }
  render() {
    const { content } = this.props.data; 
    return (
      <div {...container}>
          <span>{content}</span>
      </div>
    )
  }
}