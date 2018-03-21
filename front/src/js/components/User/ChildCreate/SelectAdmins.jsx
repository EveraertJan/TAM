import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom'
import { row, columns } from 'glamor/ous';

import { ChildCreateAdmin } from './../../../actions/ChildActions';

class SelectAdmins extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.state = {
      values: {
        child: props.child.detail.uuid
      }
    }
  }
  handleSubmit(){
    this.props.createAdmin(this.state.values)
  }
  displayErrors(){
    return ""
  }
  onFieldChange(e, field) {
    const curState = this.state;
    curState['values'][field] = e.target.value;
    this.setState(curState)
  }


  render(){
    return (
      <div className="createChildBlock">
        <div className="blockHeader">
          <h1>Select admins</h1>
          <p className="info">This information will not be stored</p>
        </div>
        <div className="adminList">
          { this.props.child.admins.map((index, key) => {
              return (
                <div className="adminItem" {...row} key={key}>
                  <span {...columns(3)} className="adminName">{index.name_first}</span>
                  <span {...columns(3)} className="adminName">{index.name_last}</span>
                  <span {...columns(3)} className="adminMail">{index.usermail}</span>
                  <span {...columns(2)} className="adminRelation">{index.call}</span>
                  <span {...columns(1)} className="adminDelete">X</span>
               </div>
              )
          })}
        </div>
        <div className="adminAdd">
          <div {...row}>
            <span {...columns(3)} className="adminName"><input type="text" name="text" placeholder="first name" onChange={(e) => this.onFieldChange(e, 'name_first') } /></span>
            <span {...columns(3)} className="adminName"><input type="text" name="text" placeholder="last name" onChange={(e) => this.onFieldChange(e, 'name_last') } /></span>
            <span {...columns(3)} className="adminMail"><input type="email" name="email" placeholder="email" onChange={(e) => this.onFieldChange(e, 'usermail') } /></span>
            <span {...columns(2)} className="adminRelation"><input type="text" name="text" placeholder="relation" onChange={(e) => this.onFieldChange(e, 'call') } /></span>
            <span {...columns(1)} className="adminAddCTA" onClick={this.handleSubmit}>+</span>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(state => {
  return {
    child: state.child
  }
}, dispatch => {
  return {
    createAdmin: (payload) => dispatch(ChildCreateAdmin(payload))
  }
})(SelectAdmins);
