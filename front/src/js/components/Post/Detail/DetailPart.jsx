import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';

class DetailPart extends Component {
  render(){
    return (
      <div className="container postContent">
        <p>
          {this.props.data}
        </p>
      </div>
    )
  }
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(DetailPart);

