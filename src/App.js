import React, { Component } from 'react';
import { Route } from 'react-router';
import { actionCreators } from './actions/creators';
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
import ApiConfig from './services/api/config';

import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
  API: ApiConfig,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.props.onAuthUIStateChange(async (nextAuthState, authData) => {
      if (
        this.state.authState === AuthState.SignedIn &&
        nextAuthState !== AuthState.SignedIn
      ) {
        this.props.signOut();
      }

      this.setState({
        authState: nextAuthState,
        authData: authData,
      });

      if (nextAuthState === AuthState.SignedIn) {
        if (!this.props.isInitialised) {
          await this.props.initialise();
        }
      }
    });
  }

  render() {
    if (this.state.authState === AuthState.SignedIn && this.state.authData) {
      if (this.props.isInitialised) {
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
      } else {
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
            {
              type: 'given_name',
              label: 'Given Name *',
              placeholder: 'Enter your given name',
              required: true,
            },
            {
              type: 'family_name',
              label: 'Family Name *',
              placeholder: 'Enter your family name',
              required: true,
            },
          ]}
        />
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          formFields={[
            { type: 'email', required: true },
            { type: 'password', required: true },
          ]}
        />
      </AmplifyAuthenticator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isInitialised: getIsInitialised(state),
    onAuthUIStateChange: onAuthUIStateChange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
