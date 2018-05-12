import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './containers/HomePage';
import ProjectPage from './containers/ProjectPage';
import EnvironmentStatePage from './containers/EnvironmentStatePage';
import TogglePage from './containers/TogglePage';

export default () => (
  <Layout>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/projects/:id' component={ProjectPage} />
    <Route exact path='/projects/:projectId/environments/:environmentKey' component={EnvironmentStatePage} />    
    <Route exact path='/projects/:projectId/toggles/:toggleKey' component={TogglePage} />       
  </Layout>
);
