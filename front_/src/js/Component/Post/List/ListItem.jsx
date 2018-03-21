import React, { Component } from 'react';
import { css } from 'glamor'
import { Link } from 'react-router-dom'

const container = css({
  width: 'calc(( 100% / 3 ) - 20px)',
  float: 'left',
  margin: '10px',
  backgroundColor: '#eee',
  height: '200px'
})

const imgContainer = css({
  width: '100%',
  height: '150px'
})

export default class UserBox extends Component {
  constructor() {
    super();
  }
  render() {
    const { title, excerpt, user, uuid } = this.props.data; 
    return (
      <div {...container}>
        <Link to={`/posts/${uuid}`}>
          <img src='#' {...imgContainer} />
          <span>{title} - by {user}</span>
        </Link>
      </div>
    )
  }
}