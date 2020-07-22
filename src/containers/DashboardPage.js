import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { getProjects, getIsLoading, getAudit } from '../store/Account';
import Projects from '../components/Projects';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.css';

class DashboardPage extends Component {
  componentDidMount() {
    this.props.requestAccount();
  }

  render() {
    if (this.props.isLoading) {
      return <PageLoading />;
    }

    if (!this.props.projects) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <h1>My Dashboard</h1>
          <Projects projects={this.props.projects} />
          <Audit audit={this.props.audit} />
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: getProjects(state),
    isLoading: getIsLoading(state),
    audit: getAudit(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
