import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

const container = css({
	marginTop: '100px'
})

import Createheader from './CreateHeader';
import CreateHeaderImage from './CreateHeaderImage';
import CreatePart from './CreatePart'

class CreateApp extends Component {
	
	render(){
		return (
			<div {...container}>
				<CreateHeaderImage />
				{this.props.file.image.data.uuid ? 
					<Createheader /> : null }
				{
					this.props.post.created.parts.map((part, key) => {
						return (
							<CreatePart key={key} values={part} />
						);
					})
				}
				{ this.props.post.created.data.uuid ? 
					<div className="savePostHolder">
						<Link to={`/post/${this.props.post.created.data.uuid}`}>Go to post</Link>
					</div> : null
				}	
			</div>
			)
	}
}

export default connect(state => {
	return {
		user: state.user,
		post: state.post,
		file: state.file
	}
}, dispatch => {
 return {}
 }
)(CreateApp);
