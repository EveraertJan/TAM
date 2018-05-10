import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

import { ToggleSideMenu } from './../../actions/GlobalActions'

import MenuBar from './MenuBar'
import SideMenu from './SideMenu'

class MenuApp extends Component{
	constructor(props) {
		super(props);
	}
	render(){
		let prefix = "tell about";
		
		return (
			<div>
				<MenuBar />
				<SideMenu />
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
 	}
}
)(MenuApp);