import React from 'react';
import { shallow } from 'enzyme';

import { Projects } from './Projects';

it('renders undefined value without crashing', () => {
  shallow(<Projects />);
});

it('renders nominal value without crashing', () => {
  const props = {
    projects: [
      {
        id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        name: 'My First Project'
      },
      {
        id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
        name: 'my new environment'
      }
    ]
  };

  shallow(<Projects {...props} />);
});
