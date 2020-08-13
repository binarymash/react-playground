﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { getProject, getIsLoading } from '../store/Project';
import Badge from 'react-bootstrap/Badge';
import AccessStrategies from '../components/AccessStrategies';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';

class AccessPage extends Component {
  componentDidMount() {
    this.props.selectProject(this.props.match.params.projectId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.match.params.projectId === this.props.match.params.projectId
    ) {
      return;
    }

    this.props.selectProject(this.props.match.params.projectId);
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
            Access Methods{' '}
            <Badge variant="light">
              {this.props.project.clientAccessStrategies.length}
            </Badge>
          </h1>
          <AccessStrategies
            strategies={this.props.project.clientAccessStrategies}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccessPage);
