import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class Updating extends Component {
  render() {
    if (this.props.isActive) {
      return (
        <span className="float-right">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </span>
      );
    }

    return null;
  }
}
