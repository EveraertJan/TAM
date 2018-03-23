import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { css } from 'glamor'

import { ToggleSideMenu } from './../../actions/GlobalActions'

const logout = css({
  float: 'left',
  lineHeight: '45px',
  marginRight: '20px',
  color: '#aaa'
})

class MenuBar extends Component{
  constructor(props) {
    super(props);
  }
  logout() {
    document.cookie = 'jwt=null'
  }
  render(){
    let prefix = "tell about";
    
    return (
      <div>
        <div className="u-full-width menuWrap">
          <div className="fLeft menuFill">
            <div className="icon menu-inactive" onClick={this.props.toggleMenu}></div>
          </div>
          <div className="fRight menuFill">
            <a onClick={this.logout} {...logout}>Log out</a>
            <Link to={`/user/${this.props.user.loggedIn.uuid}`}>
               <div className="user-image-small">
                <img src={`${process.env.REACT_APP_API_URL}${this.props.user.loggedIn.profilePicture}`} />
              </div>
            </Link>
          </div>
          <div className="fCenter menuFill">
            <span className="tellAbout">{prefix}&nbsp;</span>
            <Link to={"/"}><span className="tellAboutName">{this.props.user.loggedIn.name_first}</span></Link>
            <div className="HI_CTA">
              <Link to="hiddenInterest" className="CTAHI"></Link>
            </div>
          </div>

        </div>
      </div>
      )
  }
}
export default  connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
  return {
    toggleMenu: () => dispatch(ToggleSideMenu())
  }
}
)(MenuBar);