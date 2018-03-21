import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';


import ChildCreateApp from './ChildCreate/ChildCreateApp'
import EditApp from './Edit/EditApp';

class UserApp extends Component {


	render(){
		
		return (
			<div>
				<Switch>
          <Route exact path='/user/createChild' component={ChildCreateApp} />
        	<Route path='/user/:uuid' component={EditApp} />
        </Switch>
			</div>
		)
	}
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(UserApp);