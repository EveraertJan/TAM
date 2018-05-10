import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

import CommentApp from "./../Comments/CommentApp";
import DetailHeader from './DetailHeader'
import DetailPart from './DetailPart'

import { PostFetchDetail } from './../../../actions/PostActions';

class PostDetailApp extends Component {
	componentDidMount() {
		this.props.loadDetail(this.props.match.params.uuid)
	}
	render(){
		return (
			<span>
				{ this.props.post.detail.uuid ? 
					<div>
						<DetailHeader details={this.props.post.detail} />
							<DetailPart data={this.props.post.detail.excerpt} />
						{ this.props.post.detail.parts.map((part, key) => {
							return <DetailPart data={part.content} key={key} />
						})}
						{/*<CommentApp />*/}
					</div> : null
				}
			</span>
		)
	}
}

export default connect(state => {
	return {
		post: state.post
	}
}, dispatch => {
 return {
 	loadDetail: (id) => dispatch(PostFetchDetail(id))
 }
})(PostDetailApp);

