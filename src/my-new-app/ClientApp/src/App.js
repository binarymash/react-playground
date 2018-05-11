import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import Project from './components/Project';
import Environment from './components/Environment';
import Toggle from './components/Toggle';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/projects/:id' component={Project} />
    <Route exact path='/projects/:projectId/environments/:environmentKey' component={Environment} />    
    <Route exact path='/projects/:projectId/toggles/:toggleKey' component={Toggle} />       
  </Layout>
);
