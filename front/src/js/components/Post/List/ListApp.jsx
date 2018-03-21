import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { container, row } from 'glamor/ous'
import { css } from 'glamor' 

import { PostFetchList } from './../../../actions/PostActions';
import Feed from './Feed'

const spaced = css({
  paddingTop: '50px'
})

class ListApp extends Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.uuid);
  }
	render(){
		
		return (
      <div {...spaced}>
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
	  fetchList: (user = null) => dispatch(PostFetchList(user)) 
	}
})(ListApp);

