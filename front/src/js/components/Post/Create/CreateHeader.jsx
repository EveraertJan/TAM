import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { container, row, columns} from 'glamor/ous'
import CreateHeaderImage from './CreateHeaderImage';

import { PostCreateItem } from './../../../actions/PostActions';

const wrap = css({
  marginTop: '100px'
})

const h1Box = css({
  fontSize: '35px !important',
  borderBottom: '1px solid rgb(221, 14, 30)',
})

const spaced = css({
  margin: '0px !important'
})
const aboutText = css({
  lineHeight: '40px'
})

const saveHolder = css({
  float: 'right',
  '> a': {
    margin: '0px'
  }
})

const excerptBox = css({
  marginTop: '10px'
})

class CreateHeader extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.state = {
      values: {
        title: "",
        excerpt: "",
        about_id: props.user.detail.uuid,
        tags: ""
      }
    }
  }
  handleSubmit(){
    const values = this.state.values;
    values['media_id'] = this.props.file.image.data.uuid;
    this.props.createPost(values)
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
      <div className="headerInfo" {...wrap} {...container}>
        <CreateHeaderImage />
        <div {...row}>
          <input type='text' name='title' onChange={(e) => this.onFieldChange(e, 'title') } placeholder='enter a title' {...h1Box} />
        </div>
        <div className="postWriteDetail">
          <div {...row}>
            <div {...aboutText} >
              <span className="sepText">By</span>
              <Link to="/user/2" className="userLink">{this.props.user.loggedIn.name_first}</Link>
              <span className="sepText">about</span>
              <select name="kids" className="userSelect" {...spaced} onBlur={(e) => this.onFieldChange(e, 'about_id')}>
                { this.props.user.loggedIn.admin_of.map((child, key) => {
                  return (
                    <option value={child.uuid} key={key}>
                      {`${child.name_first} ${child.name_last}`}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
        <div {...row}>
          <textArea {...excerptBox} onChange={(e) => this.onFieldChange(e, 'excerpt')} defaultValue={'Start writing'}>

          </textArea>
        </div>
        <div {...row}>
          <input type="text" placeholder={'add tags, separated with ","'} onBlur={(e) => this.onFieldChange(e, 'tags')} />
        </div> 
        <div {...row}>
          <div {...saveHolder}>
            <span className="postSaveCTA" onClick={this.handleSubmit}>Save</span>
          </div>
        </div>
      </div>
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
      createPost: (payload) => dispatch(PostCreateItem(payload))
    }
 })(CreateHeader);
