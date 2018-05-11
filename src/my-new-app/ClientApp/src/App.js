import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './containers/HomePage';
import NavMenu from './components/NavMenu';
import Project from './components/Project';
import EnvironmentStatePage from './containers/EnvironmentStatePage';
import Toggle from './components/Toggle';

export default () => (
  <Layout>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/projects/:id' component={Project} />
    <Route exact path='/projects/:projectId/environments/:environmentKey' component={EnvironmentStatePage} />    
    <Route exact path='/projects/:projectId/toggles/:toggleKey' component={Toggle} />       
  </Layout>
);
