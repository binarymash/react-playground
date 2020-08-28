import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/creators';
import { getProject, getIsLoading } from '../store/Project';
import Badge from 'react-bootstrap/Badge';
import Toggles from '../components/Toggles';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';

class TogglesPage extends Component {
  async componentDidMount() {
    await this.props.fetchProjectIfNeeded(this.props.match.params.projectId);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.match.params.projectId === this.props.match.params.projectId
    ) {
      return;
    }

    await this.props.fetchProjectIfNeeded(this.props.match.params.projectId);
  }

  render() {
    if (this.props.isLoading) {
      return <PageLoading />;
    }

    if (!this.props.project) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <h1>
            Toggles{' '}
            <Badge variant="light">{this.props.project.toggles.length}</Badge>
          </h1>
          <Toggles
            toggles={this.props.project.toggles}
            projectId={this.props.project.id}
          />
          <Audit audit={this.props.project.audit} />
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    project: getProject(state, ownProps.match.params.projectId),
    isLoading: getIsLoading(state, ownProps.match.params.projectId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TogglesPage);
