import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
import { container, row, columns } from 'glamor/ous'

const headerImage = css({
  backgroundColor: '#aaa',
  marginTop: '70px'
})

class UserHeader extends Component {
  render(){
    const { admins, info, name_first, name_last, date_of_birth, url } = this.props.user.detail;
    return (
      <div>
        <div className="u-full-width userHeader" {...headerImage}>
          <img src={`http://localhost:3000${url}`} {...headerImage} />
        </div>
        <div className="container-wide userInfo" >
          <div {...row}>
            <div className="infoBlock" >
              <div className="icon profile-inactive"></div>
              <span className="infoEl">{name_first} {name_last}</span>
            </div>
            <div className="infoBlock">
              <div className="icon birthday-inactive"></div>
              <span className="infoEl">{date_of_birth}</span>
            </div>
            <div className="infoBlock">
              <div className="icon hospital-inactive"></div>
              <span className="infoEl">{info ? <span>{info.place}</span> : null }</span>
            </div>
            <div className="userLinks adminHolder">
              { admins ?
                admins.map((admin, key) => {
                  return (
                    <Link to={`/user/${admin.uuid}`} key={key}>
                      <div className="user-image-small">
                        <img src={`http://localhost:3000${admin.url}`} />
                      </div>
                    </Link>
                  )
                })
                : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
return {
  user: state.user
}
}, dispatch => {
 return {}
 }
)(UserHeader);