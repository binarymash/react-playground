import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {

  render() {

    let style={
      background: '#eee',
      padding:'10px',
    }

    return(
      <div style={style}>
        <div>Loading... please wait a moment...</div>
      </div>
    ); 
  } 
}

export default connect(
)(Loading);
