import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions/creators';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import '../../containers/NavMenu.css';

export class ProjectSidebar extends Component {
  render() {
    debugger;
    if (!this.props.project) {
      return <div></div>;
    }

    return (
      <div>
        <Nav.Item>
          <LinkContainer to={`/projects/${this.props.project.id}`} exact>
            <Nav.Link active={false}>Summary</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer
            to={`/projects/${this.props.project.id}/environments`}
            exact
          >
            <Nav.Link active={false}>Environments</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer
            to={`/projects/${this.props.project.id}/toggles`}
            exact
          >
            <Nav.Link active={false}>Toggles</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer
            to={`/projects/${this.props.project.id}/certificates`}
            exact
          >
            <Nav.Link active={false}>Access</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(ProjectSidebar);
