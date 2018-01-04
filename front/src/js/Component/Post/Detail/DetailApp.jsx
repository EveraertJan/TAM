import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor'

import DetailPart from './DetailPart'

import { PostFetchDetail } from './../../../Actions/PostActions'

const container = css({
  maxWidth: '800px',
  margin: 'auto',
  marginTop: '50px'
})

class DetailApp extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.uuid)
  }
  render() {
    const { title, parts } = this.props.post.detail
    if(title) {
      return (
        <div {...container}>
          <img src='' />

          <h1>{title}</h1>

          { this.props.post.detail.parts.map((index, key) => {
            return <DetailPart data={index} key={key} />
          })}
        </div>
      )
    } else {
      return (
        <div {...container}>
          loading
        </div>
      )
    }
  }
}

export default connect(state => {
  return {
    post: state.post
  }
},
dispatch => {
  return {
    fetchDetail: (data) => { dispatch( PostFetchDetail(data) )} 
  }
})(DetailApp)