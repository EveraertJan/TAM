import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { container, row, columns} from 'glamor/ous'

import { PostCreateItemPart } from './../../../actions/PostActions';


class CreatePart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.state = {
      values: {
        post_id: props.post.created.data.uuid
      }
    }
  }
  handleSubmit(){
    this.props.select(this.state.values)
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
      select: (payload) => dispatch(PostCreateItemPart(payload))
    }
 })(CreatePart);

          