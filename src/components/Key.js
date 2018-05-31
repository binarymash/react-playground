import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';

class Key extends Component {

  render() {
    if (!this.props.value){
      return null;
    }
    return (
        <code>{this.props.value} <Glyphicon glyph='copy'/></code>
    );
  }
}

export default connect(
)(Key);
