import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { PageHeader } from 'react-bootstrap';
import {
  getEnvironment,
  getIsEnvironmentLoading,
  getIsEnvironmentStateLoading
} from '../store/Environment';
import Key from '../components/Key';
import ToggleStates from '../components/ToggleStates';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';

class EnvironmentPage extends Component {
  componentWillMount() {
    this.props.selectEnvironment(
      this.props.match.params.projectId,
      this.props.match.params.environmentKey
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.environmentKey ===
        this.props.match.params.environmentKey
    ) {
      return;
    }

    this.props.selectEnvironment(
      nextProps.match.params.projectId,
      nextProps.match.params.environmentKey
    );
  }

  render() {
    if (this.props.isEnvironmentLoading) {
      return <PageLoading />;
    }

    if (!this.props.environment) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <PageHeader>
            {this.props.environment.name}
            <div>
              <small>
                <Key value={this.props.environment.key} />
              </small>
            </div>
          </PageHeader>

          <ToggleStates
            toggles={this.props.environment.toggles}
            projectId={this.props.match.params.projectId}
            environmentKey={this.props.match.params.environmentKey}
            isLoading={this.props.isEnvironmentStateLoading}
          />

          <Audit audit={this.props.environment.audit} />
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    environment: getEnvironment(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.environmentKey
    ),
    isEnvironmentLoading: getIsEnvironmentLoading(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.environmentKey
    ),
    isEnvironmentStateLoading: getIsEnvironmentStateLoading(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.environmentKey
    )
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentPage);
