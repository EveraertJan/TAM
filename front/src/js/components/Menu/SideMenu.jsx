import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
import { ToggleSideMenu } from './../../actions/GlobalActions'

const holder = css({
  backgroundColor: '#fff',
  width: '50px',
  position: 'fixed',
  top: '50px',
  left: '0px',
  boxSizing: 'border-box',
  height: 'calc(100vh - 50px)',
  zIndex: '100',
})

const userList = css({
  width: '100%',
  float: 'left'
})
const addChild = css({
  backgroundColor: '#aaa',
  color: '#fff',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  float: 'left',
  margin: '10px',
  lineHeight: '30px',
  textAlign: 'center'
})

const noChildsSpan = css({
  color: '#aaa',
  width: '100%',
  textAlign: 'center',
  display: 'block',

})
const userImageSmall = css({
  backgroundColor: '#aaa',
  color: '#fff',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  float: 'left',
  margin: '10px',
  overflow: 'hidden',
  '> img': {
    width: '100%',
    height: '100%'
  }
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
            { this.props.user.loggedIn.admin_of && this.props.user.loggedIn.admin_of.length === 0 ? <span {...noChildsSpan}>No childs found</span> : null}
            { this.props.user.loggedIn.admin_of && this.props.user.loggedIn.admin_of.map((index, key) => {
              return (
                <Link to={`/${index.uuid}`} key={key}>
                  <div {...userImageSmall}>
                    <img src={`${process.env.REACT_APP_API_URL}${index.profilePicture}`} />
                  </div>
                </Link>
              )
            })}
          </div>   
          <Link to="/user/createChild">
            <div {...addChild}>+</div>
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