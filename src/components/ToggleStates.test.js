import React from 'react';
import { shallow } from 'enzyme';

import { ToggleStates } from './ToggleStates';

it('renders when is loading without crashing', () => {
  const props = {
    isLoading: true
  };
  shallow(<ToggleStates {...props} />);
});

it('renders nominal value without crashing', () => {
  const props = {
    isLoading: false,
    toggles: []
  };

  shallow(<ToggleStates {...props} />);
});
