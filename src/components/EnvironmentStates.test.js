import React from 'react';
import { shallow } from 'enzyme';

import { EnvironmentStates } from './EnvironmentStates';

it('renders when is loading without crashing', () => {
  const props = {
    isLoading: true
  };
  shallow(<EnvironmentStates {...props} />);
});

it('renders nominal value without crashing', () => {
  const props = {
    isLoading: false,
    environments: []
  };

  shallow(<EnvironmentStates {...props} />);
});
