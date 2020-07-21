import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { Alert, PageHeader } from 'react-bootstrap';
import {
  getClientAccessStrategy,
  getIsLoading
} from '../store/ClientAccessStrategy';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';

class ClientAccessStrategyX509Page extends Component {
  componentWillMount() {
    this.props.selectClientAccessStrategy(
      this.props.match.params.projectId,
      this.props.match.params.strategyId
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.strategyId === this.props.match.params.strategyId
    ) {
      return;
    }

    this.props.selectClientAccessStrategy(
      nextProps.match.params.projectId,
      nextProps.match.params.strategyId
    );
  }

  render() {
    if (this.props.isLoading) {
      return <PageLoading />;
    }

    if (!this.props.strategy) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <PageHeader>
            X509 Certificate
            <div>
              <small>{this.props.strategy.clientCertificate.id}</small>
            </div>
          </PageHeader>
          <section>
            <Alert bsStyle="info">
              To use this certificate you need to know the private key
              associated with it. This information is only available during
              certificate creation, and cannot be retrieved later.
            </Alert>
          </section>
          <section>
            <h3>Client Certificate Details</h3>

            <pre>
              <code>{this.props.strategy.clientCertificate.pem}</code>
            </pre>
            <div>
              <strong>Creation date</strong>:{' '}
              {this.props.strategy.clientCertificate.created}
            </div>
            <div>
              <strong>Expiry date</strong>:{' '}
              {this.props.strategy.clientCertificate.notAfter}
            </div>
            <div>
              <strong>Status</strong>:{' '}
              {this.props.strategy.clientCertificate.status}
            </div>
          </section>

          <section>
            <h3>CA Certificate Details</h3>
            <pre>
              <code>{this.props.strategy.rootCertificatePem}</code>
            </pre>
          </section>
          <Audit audit={this.props.strategy.audit} />
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    strategy: getClientAccessStrategy(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.strategyId
    ),
    isLoading: getIsLoading(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.strategyId
    )
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientAccessStrategyX509Page);
