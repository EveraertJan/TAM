import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router'


class UserSelectApp extends Component {
	render(){
		return (

			<div className="container selectUserContainer">
				<h1>select a child</h1>
				<div className="userContainer">
					<Link to="/user/3">
						<div className="userOption">
							<img src="img/profiles/kid1.jpg" />
						</div>
						<span className="userName">Lou</span>
					</Link>
					<Link to="/user/3">
						<div className="userOption">
							<img src="img/profiles/kid2.jpg" />
						</div>
						<span className="userName">Jack</span>
					</Link>
					<Link to="/user/3">
						<div className="userOption">
							<img src="img/profiles/kid3.jpg" />
						</div>
						<span className="userName">Rocco</span>
					</Link>
				</div>
			</div>

			)
	}
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(UserSelectApp);