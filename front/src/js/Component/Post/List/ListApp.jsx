import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import { PostFetchList } from './../../../Actions/PostActions'

import ListItem from './ListItem'

const container = css({
  maxWidth: '800px',
  margin: 'auto',
  marginTop: '50px'
})

class ListApp extends Component {
  constructor() {
    super();
  }
  componentDidMount() {

    this.props.fetchList()
  }
  render() {
    return (
      <div {...container}>
        {this.props.post.list.map((index, key) => {
          return <ListItem data={index} key={key} /> 
        })}
      </div>
    )
  }
}

export default connect(state => {
  return {
    post: state.post
  }
},
dispatch => {
  return {
    fetchList: (data) => { dispatch( PostFetchList(data) )} 
  }
})(ListApp)