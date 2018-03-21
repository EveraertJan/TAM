import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom'

import CreateUser from './CreateUser'
import BirthInfo from './BirthInfo'
import SelectAdmins from './SelectAdmins';
import SendInvite from './SendInvite'

class ChildCreateApp extends Component {

	render(){
		return (
			<div className="container createChildContainer">
				<div className="createChildBlock">
					<div className="blockHeader">
						<h1>Ready for the next step</h1>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit faucibus lectus a sollicitudin. Donec eget enim ullamcorper metus blandit finibus condimentum ac ipsum. Integer fringilla risus orci, et congue nulla faucibus nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi pellentesque ultrices elementum. Nam venenatis sapien vel nunc pellentesque sagittis. Fusce sed dolor posuere lacus pharetra fringilla.
					</p>
				</div>
				<CreateUser />
				{ this.props.child.detail.uuid ? <BirthInfo />: null}
				{ this.props.child.userInfo.uuid ? <SelectAdmins />: null}
				{ this.props.child.admins.length > 0 ? <SendInvite />: null}
			</div>
		);
	}
};

export default connect(state => {
	return {
		child: state.child
	}
}, dispatch => {
 	return {}
})(ChildCreateApp);
