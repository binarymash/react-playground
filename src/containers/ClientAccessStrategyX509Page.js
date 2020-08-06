import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import {
  getClientAccessStrategy,
  getIsLoading,
  getIsCreating,
} from '../store/ClientAccessStrategy';
import Audit from '../components/Audit';
import PageCreating from '../components/PageCreating';
import PageLoading from '../components/PageLoading';
import Fade from '../services/transitions/fade.js';
import Keys from '../components/AccessStrategyX509Keys';
import { motion, AnimatePresence } from 'framer-motion';

class ClientAccessStrategyX509Page extends Component {
  state = {};

  doCreate = () => {
    this.props
      .addClientAccessStrategyX509(
        this.props.match.params.projectId,
        this.props.match.params.strategyId
      )
      .then((response) => {
        if (response) {
          this.setState({
            privateKey: response.PrivateKey,
            publicKey: response.PublicKey,
            keysAvailable: true,
          });
        }
      })
      .then(() => {
        this.doLoad();
      });
  };

  doLoad = () => {
    this.props.selectClientAccessStrategy(
      this.props.match.params.projectId,
      this.props.match.params.strategyId
    );
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.isCreating) {
      this.doCreate();
    } else {
      this.doLoad();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.projectId === this.props.match.params.projectId &&
      prevProps.match.params.strategyId === this.props.match.params.strategyId
    ) {
      return;
    }

    this.doLoad();
  }

  render() {
    if (this.props.isCreating) {
      return <PageCreating />;
    }

    if (this.props.isLoading) {
      return <PageLoading />;
    }

    if (!this.props.strategy) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <h1>
            X.509 Certificate
            <div style={{ overflowWrap: 'break-word' }}>
              <small>{this.props.strategy.clientCertificate.id}</small>
            </div>
          </h1>
          <section>
            <Keys
              privateKey={this.state.privateKey}
              publicKey={this.state.publicKey}
              available={this.state.keysAvailable}
            ></Keys>
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
    isCreating: getIsCreating(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.strategyId
    ),
    isLoading: getIsLoading(
      state,
      ownProps.match.params.projectId,
      ownProps.match.params.strategyId
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientAccessStrategyX509Page);
