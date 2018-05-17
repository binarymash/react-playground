import React from 'react';
import { Route } from 'react-router';
import Layout from './containers/Layout';
import DashboardPage from './containers/DashboardPage';
import ProjectPage from './containers/ProjectPage';
import EnvironmentStatePage from './containers/EnvironmentStatePage';
import TogglePage from './containers/TogglePage';
import ModalRoot from './containers/modals/ModalRoot';

export default () => (
  <Layout>
    <Route exact path='/' component={DashboardPage} />
    <Route exact path='/projects/:id' component={ProjectPage} />
    <Route exact path='/projects/:projectId/environments/:environmentKey' component={EnvironmentStatePage} />    
    <Route exact path='/projects/:projectId/toggles/:toggleKey' component={TogglePage} /> 
    <ModalRoot />      
  </Layout>
);
