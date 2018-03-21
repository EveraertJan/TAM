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
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '> .col': {
    padding: '10px',
    boxSizing: 'border-box',
    flex: '1',
    float: 'left',
    flexBasis: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
    alignContent: 'flex-start',
    maxWidth: '300px',
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
        <Link className="createCTA" to="/create">Tell a story</Link>
        {Object.keys(postList).map((item, key) => {
          return (
            <div {...day} key={key}>
              {
                postList[item].map((post, key) => {
                  return (
                    <div className='col' key={key}>
                      {post}
                    </div>)
                })
              }
            </div>
          )
        })}
        
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

