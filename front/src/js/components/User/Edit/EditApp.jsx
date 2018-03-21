import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { container, row } from 'glamor/ous';
import { css } from 'glamor'

import { userEditItem, userFetchDetailAction } from './../../../actions/UserActions';
import { FileUploadImage } from './../../../actions/FileActions';

const white = css({
  backgroundColor: '#fff',
  padding: '20px',
  boxSizing: 'border-box',
  marginTop: '100px',
  marginBottom: '100px'
})

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


class EditApp extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileHandler = this.fileHandler.bind(this);

  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.uuid);
  }
  handleSubmit(){

    const val = {};
    val['name_first'] = document.getElementById('nameFirstInput').value;
    val['name_last'] = document.getElementById('nameLastInput').value;
    val['usermail'] = document.getElementById('emailInput').value;
    val['date_of_birth'] = document.getElementById('dobInput').value;
    val['media_id'] = this.props.file.image.data.uuid;

    this.props.editUser(val)
  }
  fileHandler() {
    var data = new FormData();
    data.append('foo', 'bar');
    data.append('file', document.getElementById('file').files[0]);
    this.props.uploadImage(data)
  }
  render(){
    return (
      <span>
        {
          this.props.user.detail.name_first ? 
            <div {...container} {...white}>
              <div className="userImage">
                <label htmlFor="file" {...label}><div className="icon filter-image-inactive"></div>Upload an image </label>
                <input id="file" type="file" onChange={this.fileHandler} {...inputfile} />
                <div {...row}>
                  {this.props.file.image.data.url ?
                    <img src={`http://localhost:3000${this.props.file.image.data.url}`} {...img} />
                    : 
                    <img src={`http://localhost:3000${this.props.user.detail.url}`} {...img} />
                  }
                </div>
              </div>
              <div className="fieldInputWrap">
                <label htmlFor="name_first">First name</label>
                <div className="formError" id="nameFirstError">please fill out</div>
                <input type="text" id="nameFirstInput" name="name_first" placeholder="John" defaultValue={this.props.user.detail.name_first} />
              </div>
              <div className="fieldInputWrap">
                <label htmlFor="name_last">Last name</label>
                <div className="formError" id="nameLastError">please fill out</div>
                <input type="text" id="nameLastInput" name="name_last" placeholder="Doe" defaultValue={this.props.user.detail.name_last} />
              </div>
              <div className="fieldInputWrap">
                <label htmlFor="email">Email</label>
                <div className="formError" id="nameError">please fill out</div>
                <input type="text" id="emailInput" name="email" placeholder="john@doe.com" defaultValue={this.props.user.detail.usermail} />
              </div>
              <div className="fieldInputWrap">
                <label htmlFor="dob">Date of Birth</label>
                <div className="formError" id="nameError">please fill out</div>
                <input type="date" id="dobInput" name="dob" placeholder="Date of birth" defaultValue={this.props.user.detail.date_of_birth} />
              </div>
              <a className="primaryCTA" onClick={this.handleSubmit}>Save</a>
            </div> 
          : null
        }
      </span>
    )
  }
}

export default connect(state => {
  return {
    user: state.user,
    file: state.file
  }
}, dispatch => {
  return {
    editUser: (payload) => dispatch(userEditItem(payload)),
    uploadImage: (payload) => dispatch(FileUploadImage(payload)),
    fetchUser: (id) => dispatch(userFetchDetailAction(id))
  }
})(EditApp);
