import React, { Component } from 'react';
import { Route } from 'react-router';
import { actionCreators } from './actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getIsInitialised } from './store/Account';
import Layout from './containers/Layout';
import DashboardPage from './containers/DashboardPage';
import ProjectPage from './containers/ProjectPage';
import EnvironmentPage from './containers/EnvironmentPage';
import TogglePage from './containers/TogglePage';
import ModalRoot from './containers/modals/ModalRoot';
import Loading from './components/Loading';

class App extends Component {
  componentDidMount() {
    this.props.initialise();
  }

  render() {
    if (!this.props.isInitialised) {
      // https://www.w3.org/Style/Examples/007/center.en.html
      let fill = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      };

      return (
        <div style={fill}>
          <Loading />
        </div>
      );
    }

    return (
      <Layout>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/projects/:id" component={ProjectPage} />
        <Route
          exact
          path="/projects/:projectId/environments/:environmentKey"
          component={EnvironmentPage}
        />
        <Route
          exact
          path="/projects/:projectId/toggles/:toggleKey"
          component={TogglePage}
        />
        <ModalRoot />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isInitialised: getIsInitialised(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
