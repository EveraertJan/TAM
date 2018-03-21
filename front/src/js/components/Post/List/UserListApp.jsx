import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { container, row } from 'glamor/ous'
import { css } from 'glamor' 

import Feed from './Feed'
import UserHeader from './UserHeader'

import { PostFetchList } from './../../../actions/PostActions';
import { userFetchDetailAction } from './../../../actions/UserActions';

class UserListApp extends Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.uuid);
    this.props.fetchUser(this.props.match.params.uuid);
  }
  render(){
    
    return (
      <div>
        <UserHeader />
        <Feed />    
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
    fetchList: (user = null) => dispatch(PostFetchList(user)), 
    fetchUser: (id) => dispatch(userFetchDetailAction(id))
  }
})(UserListApp);

