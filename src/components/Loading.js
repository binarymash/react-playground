import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';

class Loading extends Component {

  render() {

    let style={
      background: '#eee',
      padding:'20px',
      borderRadius:'10px',
      display:'flex',
      alignItems:'center',
    }

    let iconStyle={
      fontSize:'24px',
      padding:'8px'
    }

    return(
      <div style={style}>
        <Glyphicon style={iconStyle} glyph='time'/> Loading... please wait a moment...
      </div>
    ); 
  } 
}

export default connect(
)(Loading);
