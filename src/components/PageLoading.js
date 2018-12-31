import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

export class PageLoading extends Component {
  render() {
    let style = {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    };

    return (
      <div style={style}>
        <Loading />
      </div>
    );
  }
}

export default connect()(PageLoading);
