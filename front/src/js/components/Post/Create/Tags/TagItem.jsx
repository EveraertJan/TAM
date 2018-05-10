import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

const container = css({
  height: '20px',
  color: '#ccc'
})
const selected = css({
  color: '#aaa'
})

class TagItem extends Component {
  
  render(){
    return (
      <div {...container}>

      </div>
      )
  }
}

export default connect(state => {
  return {
    user: state.user,
    post: state.post,
    file: state.file
  }
}, dispatch => {
 return {
  selectTag: (tagId, postId) => { }
 }
 }
)(TagItem);
