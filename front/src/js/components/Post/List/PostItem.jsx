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
 marginBottom: '20px',
 marginLeft: 'calc(50% - 250px)',
 maxWidth: '500px'
})

const imageWrap = css({
    width: '100%',
    overflow: 'hidden',
    float: 'left',
    '> img': {
      width: '100%'
    }
})
const tags = css({

})

const tag = css({
  color: 'rgba(221, 14, 31, 1)',
  margin: '0px 5px 20px 0px',
  float: 'left',
  display: 'block',
  padding: '3px',
  ':hover': {
    border: '1px solid rgba(221, 14, 31, 1)',
    borderRadius: '3px',
    padding: '2px'
  }
})

class PostItem extends Component {
  render(){
    const { uuid, by, title, excerpt, about_id, user_id, created_at, media_id, media, tags } = this.props.values;
    return (
      <div {...postHolder}>
        { media && media.url ? 
            <div {...imageWrap}>
              <img src={`${process.env.REACT_APP_API_URL}${media.url}`} />
            </div>
           : null
        }
        <div className="textHolder">
          <h1>{title}</h1>
          <span className="postedOn">posted on {moment(created_at).format("MMM Do YYYY [at] h:mm")}</span>
          
          <p> {excerpt}</p>
          { tags.map((tagObj, key) => {
            return <span {...tag} key={key}>{tagObj.title.toLowerCase()}</span>
          })}
        </div>
        <Link to={`/post/${uuid}`} className="postCTA">Read More</Link>
        <div className="creatorHolder">
          <div className="user-image-small">
            <img src={`${process.env.REACT_APP_API_URL}${by.url}`} /> 
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