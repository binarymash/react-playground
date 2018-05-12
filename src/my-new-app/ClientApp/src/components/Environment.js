import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Environment extends Component {

  render() {
    return(
      <ListGroupItem>
        <Link to={`/projects/${this.props.environment.projectId}/environments/${this.props.environment.key}`} >{this.props.environment.key}</Link>
      </ListGroupItem>
    ); 
  } 
}

export default connect(
)(Environment);
