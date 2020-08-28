import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/creators';
import {
  getToggle,
  getIsToggleLoading,
  getIsToggleStateLoading,
} from '../store/Toggle';
import Key from '../components/Key';
import EnvironmentStates from '../components/EnvironmentStates';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';

class TogglePage extends Component {
  async initializeStoreData(projectId, toggleKey) {
    await Promise.all([
      this.props.fetchProjectIfNeeded(projectId),
      this.props.fetchToggle(projectId, toggleKey),
      this.props.fetchToggleState(projectId, toggleKey),
    ]);
  }

  shouldInitializeStoreData(prevProps, props) {
    return (
      prevProps.match.params.projectId !== props.match.params.projectId ||
      prevProps.match.params.toggleKey !== props.match.params.toggleKey
    );
  }

  async componentDidMount() {
    await this.initializeStoreData(
      this.props.match.params.projectId,
      this.props.match.params.toggleKey
    );
  }

  async componentDidUpdate(prevProps) {
    if (this.shouldInitializeStoreData(prevProps, this.props)) {
      await this.initializeStoreData(
        this.props.match.params.projectId,
        this.props.match.params.toggleKey
      );
    }
  }

  render() {
    if (this.props.isToggleStateLoading) {
      return <PageLoading />;
    }

    if (!this.props.toggle) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <h1>
            {this.props.toggle.name}
            <div>
              <small>
                <Key value={this.props.toggle.key} />
              </small>
            </div>
          </h1>

          <EnvironmentStates
            environments={this.props.toggle.environments}
            projectId={this.props.match.params.projectId}
            toggleKey={this.props.match.params.toggleKey}
            isLoading={this.props.isToggleStateLoading}
          />

          <Audit audit={this.props.toggle.audit} />
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    toggle: getToggle(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.toggleKey
    ),
    isToggleLoading: getIsToggleLoading(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.toggleKey
    ),
    isToggleStateLoading: getIsToggleStateLoading(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.toggleKey
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TogglePage);
