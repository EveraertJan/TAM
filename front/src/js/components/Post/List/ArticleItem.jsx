import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'

const articleHolder = css({
  float: 'left',
  flex: '4',
  maxWidth: '620px',
  flexBasis: 'auto',
  backgroundColor: '#fff',
  padding: '10px',
  boxSizing: 'border-box',
  margin: '10px',
  alignContent: 'flex-start',
  borderLeft: '5px solid rgba(221, 14, 30, 1)',
  height: 'auto',
  backgroundColor: '#FFF',
  
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',


  '> .imageHolder': {
    height: '100%',
    width: '50%',
    float: 'left'
  },
  '> .articleTextWrap': {
    float: 'left',
    width: '50%',
    display: 'block'
  }
})

class ArticleItem extends Component {
  render(){
    return (
      <div {...articleHolder}>
        <a href="#">
          <div className="imageHolder">
            <img src="img/newsImages/file2.jpg" />
            <div className="articleInfo">
              <span className="day">19</span>
              <div className="infoCell">
                <span className="month">
                  <span>April</span>
                  <span>&nbsp;</span>
                  <span>2016</span>
                </span>
                <span className="temperature">
                  <span>19</span>
                  <span>°</span>
                </span>
              </div>
            </div>
          </div>
        </a>
        <div className="articleTextWrap">
          <div className="articleElement">
            <h1>New Pope Brings Shift in Style, and Tone, to the Catholic Church</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra mattis nibh, ut condimentum nulla fringilla pretium. Nullam finibus suscipit sapien quis ultrices. Proin blandit malesuada luctus. In pulvinar, est et facilisis bibendum, lorem ligula elementum erat, vel sagittis diam leo id purus. Praesent vehicula, est at mollis faucibus, orci lectus laoreet lacus, quis facilisis nibh tortor nec urna. Nullam a libero sit amet ex condimentum bibendum. Praesent venenatis purus eros, non lobortis lacus lobortis sed. Integer sollicitudin mauris eu arcu aliquet lobortis. Curabitur a nunc et quam commodo malesuada. Suspendisse aliquam nec nisi vitae faucibus. Curabitur vel luctus purus. Ut vehicula magna at nisi c</p>
          </div>
          <a href="#" className="articleCTA" >Read More</a>
        </div>
      </div>
    )
  }
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(ArticleItem);