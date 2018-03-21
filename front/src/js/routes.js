import React, { Component } from 'react';
import { Router, Route } from 'react-router';

import UserApp from "./components/User/UserApp";
import DayFeedApp from "./components/DayFeed/DayFeedApp";
import PostDetailApp from "./components/PostDetail/PostDetailApp";
import UserSelectApp from "./components/UserSelect/UserSelectApp";
import CreateApp from "./components/Create/CreateApp";


import LoginApp from "./components/Login/LoginApp";
import ForgotPasswordApp from "./components/Login/ForgotPasswordApp";
import CreateChildApp from "./components/CreateChild/CreateChildApp";

export const routes = (
  <div>
    <Route path='/' component={UserSelectApp}/>
    <Route exact name="create" path="/create" component={CreateApp} />
    <Route exact name="postDetail" path="/post/:id" component={PostDetailApp} />
    

    <Route exact name="login" path="/login" component={LoginApp} />
    <Route exact name="logout" path="/logout" component={LogoutApp} />
    <Route exact name="forgotPassword" path="/forgotPassword" component={ForgotPasswordApp} />
    <Route exact name="register" path="/register" component={RegisterApp} />
    <Route exact name="createChild" path="/createChild" component={CreateChildApp} />
    
    <Route exact path='/feed' component={DayFeedApp} /> 

    <Route name="user" path="/user/:id" component={UserApp}>
    </Route>
  </div>
);