import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom'
import { css } from 'glamor';
import { row } from 'glamor/ous'

import { ChildCreateItem } from './../../../actions/ChildActions'
import { FileUploadImage } from './../../../actions/FileActions';


const inputfile = css({
  width: '0.1px',
  height: '0.1px',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: '-1',
  display: 'none'
})
const label = css({
  lineHeight: '50px',
  width: '100%',
  textAlign: 'center',
  border: '1px #eee',
  borderStyle: 'dashed',
  color: '#aaa',
  display: 'block',
  zIndex: 2,
  position: 'relative'
})

const img = css({
  margin: 'auto',
  width: '100%',
  float: 'left',
  marginBottom: '50px'
})

class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileHandler = this.fileHandler.bind(this);
  }
  handleSubmit(){

    const val = {};
    val['name_first'] = document.getElementById('nameFirstInput').value;
    val['name_last'] = document.getElementById('nameLastInput').value;
    val['call'] = document.getElementById('call').value;
    val['date_of_birth'] = document.getElementById('dobInput').value;
    val['media_id'] = this.props.file.image.data.uuid;

    this.props.createUser(val)
  }

  fileHandler() {
    var data = new FormData();
    data.append('foo', 'bar');
    data.append('file', document.getElementById('file').files[0]);
    this.props.uploadImage(data)
  }
  render(){
    return (
      <div className="createChildBlock">
        <div className="blockHeader">
          <h1>General information</h1>
        </div>
        <div className="halfBlock">
          <div className="fieldInputWrap">
            <label htmlFor="email">First name</label>
            <div className="formError">please fill out</div>
            <input type="text" id="nameFirstInput" name="name_first" placeholder="John" />
          </div>
          <div className="fieldInputWrap">
            <label htmlFor="password">Last name</label>
            <div className="formError">please fill out</div>
            <input type="text" id="nameLastInput" name="name_last" placeholder="Doe" />
          </div>
          <div className="fieldInputWrap">
            <label htmlFor="password">(Projected) date of birth</label>
            <div className="formError">please fill out</div>
            <input type="date" id="dobInput" name="dob" placeholder="Date of Birth" />
          </div>
          <div className="fieldInputWrap">
            <label htmlFor="password">Relation to child</label>
            <div className="formError">please fill out</div>
            <input type="text" id="call" name="call" placeholder="parent..." />
          </div>
        </div>
        <div className="halfBlock">
            <div {...row}>
              <img src={`${process.env.REACT_APP_API_URL}${this.props.file.image.data.url}`} {...img} />
            </div>
            <div {...row}>
              <label htmlFor="file" {...label}><div className="icon filter-image-inactive"></div>Upload an image </label>
              <input id="file" type="file" onChange={this.fileHandler} {...inputfile} />
            </div>
          <a className="CTA" onClick={this.handleSubmit}>save</a>
        </div>
      </div>
    );
  }
};

export default connect(state => {
  return {
    user: state.user,
    file: state.file
  }
}, dispatch => {
  return {
    createUser: (payload) => dispatch(ChildCreateItem(payload)),
    uploadImage: (payload) => dispatch(FileUploadImage(payload))
  }
})(CreateUser);
