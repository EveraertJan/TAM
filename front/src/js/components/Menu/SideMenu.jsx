import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
import { ToggleSideMenu } from './../../actions/GlobalActions'

const holder = css({
  backgroundColor: '#fff',
  width: '300px',
  position: 'fixed',
  top: '50px',
  left: '0px',
  padding: '20px',
  boxSizing: 'border-box',
  height: 'calc(100vh - 50px)',
  zIndex: '100',
})

const userList = css({
  width: '100%',
  float: 'left',
  '> a': {
    display: 'block',
    width: '100%',
    height: '50px',
    padding: '10px',
    boxSizing: 'border-box',
    lineHeight: '30px',
    color: 'rgba(221, 14, 30, 1) !important',
    float: 'left',
    textDecoration: 'none',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#eee'
    }
  },
  '> a >.user-image-small': {
    margin: '0px',
    marginRight: '10px',
    marginTop: '-2px'
  }
})
const noChildsSpan = css({
  color: '#aaa',
  width: '100%',
  textAlign: 'center',
  display: 'block'
})
class MenuApp extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let prefix = "tell about";
    
    return (
      <div>
        <div {...holder}>
          <div {...userList}>
            {  this.props.user.loggedIn.admin_of.length === 0 ? <span {...noChildsSpan}>No childs found</span> : null}
            { this.props.user.loggedIn.admin_of.map((index, key) => {
              return (
                <Link to={`/${index.uuid}`} key={key}>
                  <div className="user-image-small">
                    <img src={`${process.env.REACT_APP_API_URL}${index.profilePicture}`} />
                  </div>
                  {index.name_first} {index.name_last}
                </Link>
              )
            })}
          </div>   
          <Link to="/user/createChild">
            <div className="icon add-profile-inactive"></div>
            Add child
          </Link>   
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
)(MenuApp);