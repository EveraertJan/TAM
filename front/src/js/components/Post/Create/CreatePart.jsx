import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { container, row, columns} from 'glamor/ous'

import { PostCreateItemPart } from './../../../actions/PostActions';

const saveHolder = css({
  float: 'right',
  '> a': {
    margin: '0px'
  }
})

const areaBox = css({
  margin: '0px',
  height: '200px'
})

class CreatePart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.state = {
      values: {
        order: props.post.created.parts.length,
        post_id: props.post.created.data.uuid,
        uuid: props.values.uuid,
        content: props.values.content
      }
    }
  }
  handleSubmit(){
    this.props.createPart(this.state.values)
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
      <div className="contentWrite">
        { this.props.values.uuid ? 
          <div {...row}>
            <span>{ this.props.values.content }</span>
          </div>
          :
          <div {...row}>
            <textArea {...areaBox} defaultValue={this.props.values.content} onChange={(e) => this.onFieldChange(e, 'content')}>
            </textArea>
            <div {...saveHolder}>
              <span className="postSaveCTA" onClick={this.handleSubmit}>Save</span>
            </div>
          </div> 
        }
      </div>
    )
  }
}

export default connect(state => {
    return {
      user: state.user,
      post: state.post
    }
  }, dispatch => {
    return {
      createPart: (payload) => dispatch(PostCreateItemPart(payload))
    }
 })(CreatePart);

          