import React from 'react';
import { shallow } from 'enzyme';

import { EnvironmentState } from './EnvironmentState';

it('renders nominal value without crashing', () => {
  const props = {
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    toggleKey: 'my-first-toggle',
    environment: {
      key: 'my-first-environment',
      name: 'My First Environment',
      value: true
    },
    key: 'my-first-environment'
  };

  shallow(<EnvironmentState {...props} />);
});
