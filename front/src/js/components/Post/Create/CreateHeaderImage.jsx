import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { container, row, columns} from 'glamor/ous'
import axios from 'axios';


import { FileUploadImage } from './../../../actions/FileActions';

const imageHolder = css({
  width: '100%',
  float: 'left',
  backgroundColor: '#fff',
  padding: '10px',
  boxSizing: 'border-box',
  marginBottom: '20px',
  
})

const img = css({
  width:  '100%',
  float: 'left'
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


class CreateHeaderImage extends Component {
  constructor(props) {
    super(props)
    this.fileHandler = this.fileHandler.bind(this);
    
    this.state = {
      
    }
  }

  fileHandler() {
    var data = new FormData();
    data.append('foo', 'bar');
    data.append('file', document.getElementById('file').files[0]);
    this.props.uploadImage(data)
  
  }
  render(){
    return (
      <div {...imageHolder}>
          <div {...row}>
            <label htmlFor="file" {...label}>Upload an image </label>
            <input id="file" type="file" onChange={this.fileHandler} {...inputfile} />
          </div>
          <div {...row}>
            <img src={`http://localhost:3000${this.props.file.image.data.url}`} {...img} />
          </div>
      </div>
    )
  }
}

export default connect(state => {
    return {
      user: state.user,
      post: state.post,
      file: state.file
    }
  }, dispatch => {
    return {
      uploadImage: (payload) => dispatch(FileUploadImage(payload))
    }
 })(CreateHeaderImage);

