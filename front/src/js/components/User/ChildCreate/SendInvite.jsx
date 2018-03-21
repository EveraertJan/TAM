import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom'

class SendInvite extends Component {

  render(){
    return (
      <div className="createChildBlock">
        <div className="blockHeader">
          <h1>Example Mail</h1>
          <p className="info">click to adapt</p>
        </div>
        <div className="emailPreview">
          Dear [name_of_admin],<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a sem ligula. Vivamus feugiat, dolor nec viverra volutpat, <br /><br />ante mauris bibendum mi, vel scelerisque est sapien commodo lectus. Morbi ultricies eu justo molestie <span className="adapt">[name of partner]</span>. Donec tortor leo, blandit et nisl a, mollis venenatis nulla. Duis volutpat leo in mi sodales, sed dictum odio lobortis. Suspendisse tempus sem eget urna cursus maximus. Aliquam justo mi, dignissim eu malesuada non, rhoncus sit amet nunc. Nulla magna enim, venenatis at rutrum non, imperdiet at augue. Phasellus tempus sem vel tellus ultrices dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce mi erat, dictum vel nunc in, pulvinar aliquet erat. Morbi dignissim leo et ultricies <br /><br />pharetra. Cras accumsan eros a urna condimentum, quis interdum felis pretium. Donec aliquam, enim id consequat porttitor, ipsum augue dapibus sapien, a dictum augue nibh non est. Pellentesque in pretium purus. Nunc risus elit, tempor tempus massa at, maximus sagittis felis.<br /><br />
          love you all<br /><br />
          <span className="adapt">[your name]</span>
        </div>
        <div className="actionWrap">
          <Link to="/" className="createChildCTA">Start Archiving</Link>
          <Link to="createChild" className="createChildCTA light">Save and create new</Link>
          <div className="sendNowWrap checkboxElement">
            <input type="checkbox" value="sendnow" name="sendMails" />
            Send emails now
          </div>
        </div>
      </div>
    );
  }
};

export default connect(state => {
  return {}
}, dispatch => {
  return {}
})(SendInvite);
