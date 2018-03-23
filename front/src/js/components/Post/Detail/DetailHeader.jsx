import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import moment from 'moment'

const detailWrap = css({
    marginTop: '70px',
})
const imageWrap = css({
    '> img': {
        width: '100%'
    }
})

class DetailHeader extends Component {
  render(){
    const { media_id, media, about, user, title, created_at } = this.props.details;
    console.log(this.props)
    return (
      <div {...detailWrap}>
        { media_id ? 
            <div className="u-full-width" {...imageWrap}>
              <img src={`${process.env.REACT_APP_API_URL}${media.url}`} />
            </div> : null
        }
        <div className="container headerInfo">
          <h1>{title}</h1>

          <div className="postWriteDetail">
            <span className="sepText">By</span>
            <Link to="/user/10" className="userLink">{user.name_first} {user.name_last}</Link>
            <span className="sepText">about</span>
            <Link to="/user/2" className="userLink">{about.name_first} {about.name_last}</Link>
            <span className="dateOfWriting">{moment(created_at).format("MMM Do YYYY [at] h:mm")}</span>
          </div>
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
)(DetailHeader);

