import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom'

import { ChildCreateInfo } from './../../../actions/ChildActions'

class BirthInfo extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.state = {
      values: {
        weight_unit: 'kg',
        length_unit: 'cm'
      }
    }
  }
  handleSubmit(){
    this.props.createInfo(this.props.child.detail.uuid, this.state.values)
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
      <div className="createChildBlock birthInfo">
        <div className="blockHeader">
          <h1>Birth information</h1>
        </div>
        <div className="halfBlock">
          <div className="fieldInputWrap">
            <label htmlFor="email">Length at birth (in {this.state.values.length_unit})</label>
            <div className="formError">please fill out</div>
            <input type="number" name="length_of_birth" placeholder="eg: 44cm" onChange={(e) => this.onFieldChange(e, 'length') } />
          </div>
          <div className="fieldInputWrap">
            <label htmlFor="password">Weight at birth (in {this.state.values.weight_unit})</label>
            <div className="formError">please fill out</div>
            <input type="number" name="weight_at_birth" placeholder="eg: 3.8kg" onChange={(e) => this.onFieldChange(e, 'weight') } />
          </div>
        </div>
        <div className="halfBlock">
          <div className="fieldInputWrap">
            <label htmlFor="password">Place of birth</label>
            <div className="formError">please fill out</div>
            <input type="text" name="place_of_birth" placeholder="eg: Antwerpen" onChange={(e) => this.onFieldChange(e, 'place') } />
          </div>
          <div className="time of birth">
            <label htmlFor="password">Time and date of birth</label>
            <div className="formError">please fill out</div>
            <input type="time" name="time_date_of_birth" placeholder="Date of Birth" onChange={(e) => this.onFieldChange(e, 'time') } />
          </div>
          <a className="CTA" onClick={this.handleSubmit}>save</a>
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
    createInfo: (id, payload) => dispatch(ChildCreateInfo(id, payload))
  }
})(BirthInfo);
