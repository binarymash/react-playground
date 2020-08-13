import React, { Component } from 'react';
import { Route } from 'react-router';
import { actionCreators } from './actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIsInitialised } from './store/Account';
import Amplify from 'aws-amplify';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import Layout from './containers/Layout';
import DashboardPage from './containers/DashboardPage';
import ProjectPage from './containers/ProjectPage';
import EnvironmentsPage from './containers/EnvironmentsPage';
import EnvironmentPage from './containers/EnvironmentPage';
import TogglesPage from './containers/TogglesPage';
import TogglePage from './containers/TogglePage';
import AccessPage from './containers/AccessPage';
import ClientAccessStrategyX509Page from './containers/ClientAccessStrategyX509Page';
import ModalRoot from './containers/modals/ModalRoot';
import Loading from './components/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure({
  region: process.env.REACT_APP_COGNITO_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
});

class App extends Component {
  componentDidMount() {
    this.props.initialise();
    this.setState({});
    this.props.onAuthUIStateChange((nextAuthState, authData) => {
      this.setState({
        authState: nextAuthState,
        authData: authData,
      });
    });
  }

  render() {
    if (!this.props.isInitialised) {
      // https://www.w3.org/Style/Examples/007/center.en.html
      let fill = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      };

      return (
        <div style={fill}>
          <Loading />
        </div>
      );
    }

    if (this.state.authState === AuthState.SignedIn && this.state.authData) {
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
            path="/projects/:projectId/environments"
            component={EnvironmentsPage}
          />
          <Route
            exact
            path="/projects/:projectId/toggles/:toggleKey"
            component={TogglePage}
          />
          <Route
            exact
            path="/projects/:projectId/toggles"
            component={TogglesPage}
          />
          <Route
            exact
            path="/projects/:projectId/certificates"
            component={AccessPage}
          />
          <Route
            exact
            path="/projects/:projectId/certificates/:strategyId"
            component={ClientAccessStrategyX509Page}
          />
          <ModalRoot />
        </Layout>
      );
    }

    return (
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: 'email',
              required: true,
            },
            {
              type: 'password',
              required: true,
            },
            // {
            //   type: "given_name",
            //   label: "Given Name *",
            //   placeholder: "Enter your given name",
            //   required: true,
            // },
            // {
            //   type: "family_name",
            //   label: "Family Name *",
            //   placeholder: "Enter your family name",
            //   required: true,
            // },
          ]}
        />
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          formFields={[{ type: 'email' }, { type: 'password' }]}
        />
      </AmplifyAuthenticator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isInitialised: getIsInitialised(state),
    authState: null,
    authData: null,
    onAuthUIStateChange: onAuthUIStateChange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
