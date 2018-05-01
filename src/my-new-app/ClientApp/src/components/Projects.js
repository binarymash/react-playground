import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Projects';

class Projects extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    this.props.requestProjects(0);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    this.props.requestProjects(nextProps.version);
  }

  render() {
    return (
      <div>
        <h1>Projects</h1>
        {renderProjects(this.props)}
        {renderPagination(this.props)}
      </div>
    );
  }
}

function renderProjects(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.projects.map(project =>
          <tr key={project.id}>
            <td>{project.name}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderPagination(props) {
  return <p className='clearfix text-center'>
    {props.isLoading ? <span>Loading...</span> : []}
  </p>;
}

export default connect(
  state => state.projects,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Projects);
