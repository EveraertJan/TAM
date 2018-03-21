import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
import moment from 'moment'
 
const postHolder = css({
  width: '100%',
 float: 'left',
 backgroundColor: '#fff',
 padding: '10px',
 boxSizing: 'border-box',
 marginBottom: '20px'
})

const imageWrap = css({
    width: '100%',
    overflow: 'hidden',
    float: 'left',
    '> img': {
      width: '100%'
    }
})

class PostItem extends Component {
  render(){
    const { uuid, by, title, excerpt, about_id, user_id, created_at, media_id, media } = this.props.values;
    return (
      <div {...postHolder}>
        { media_id && media.url ? 
            <div {...imageWrap}>
              <img src={`http://localhost:3000${media.url}`} />
            </div>
           : null
        }
        <div className="textHolder">
          <h1>{title}</h1>
          <span className="postedOn">posted on {moment(created_at).format("MMM Do YYYY [at] h:mm")}</span>
          <p> {excerpt}</p>
        </div>
        <Link to={`/post/${uuid}`} className="postCTA">Read More</Link>
        <div className="creatorHolder">
          <div className="user-image-small">
            <img src={`http://localhost:3000${by.url}`} /> 
          </div>
          <span className="creatorName">{by.name_first} {by.name_last}</span>
        </div>
      </div>
    )
  }
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(PostItem);