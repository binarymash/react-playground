import React, { Component } from 'react';
import { connect } from 'react-redux';


class Loading extends Component {

  render() {
    return(
      <div>Loading... please wait a moment...</div>
    ); 
  } 
}

export default connect(
)(Loading);
