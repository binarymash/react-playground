import React, { Component } from 'react';
import { connect } from 'react-redux';
import Creating from './Creating';

export class PageCreating extends Component {
  render() {
    let style = {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div style={style}>
        <Creating />
      </div>
    );
  }
}

export default connect()(PageCreating);
