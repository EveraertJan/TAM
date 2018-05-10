import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { container, row } from 'glamor/ous'
import { css } from 'glamor' 

import PostItem from './PostItem'
import ArticleItem from './ArticleItem';

const wrap = css({
  marginTop: '50px',
  width: '100%',
  float: 'left'
})

const day = css({
  width: '100%',
  maxWidth: '300px'
})

const cta = css({
  position: 'fixed',
  top: '70px',
  left: '70px',
  width: '100px',
  display: 'block',
  height: '30px',
  textAlign: 'center',
  backgroundColor: 'rgba(221, 14, 31, 1)',
  color: '#FFF',
  textDecoration: 'none',
  lineHeight: '30px',
  borderRadius: '5px',
  zIndex: '25',
  ':hover': {
    color: '#FFF',
    backgroundColor: 'rgba(221, 14, 31, .8)'
  }
})

class Feed extends Component {
  render(){
    let lastDate = null
    let col = 0
    const postList = {}

    this.props.post.list.map((post, key) => {
      if(new Date(lastDate).getDay() !== new Date(post.created_at).getDay() || new Date(lastDate).getMonth() !== new Date(post.created_at).getMonth()) {
        lastDate = post.created_at;
        postList[lastDate] = [[],[],[]];
        col = 0
      }
      postList[lastDate][col].push(<PostItem values={post} key={key} />);
      col++;
      if(col > 2) {
        col = 0;
      }
    })
    return (
      <div {...wrap}>
        <Link {...cta} to="/create">Tell a story</Link>
        {
          this.props.post.list.map((post, key) => {
            return <PostItem values={post} key={key} />
          })
        }
        
      </div>

    )
  }
}
export default connect(state => {
  return {
    post: state.post
  }
}, dispatch => {
  return {
  }
})(Feed);

