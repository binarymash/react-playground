import React, { Component } from 'react';
import { connect } from 'react-redux';

class Key extends Component {

  render() {
    if (!this.props.value){
      return (
        <section />
      );
    }
    return (
      <section>
        <code>{this.props.value}</code>
      </section>
    );
  }
}

export default connect(
)(Key);
