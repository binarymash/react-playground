import React from 'react';
import { shallow } from 'enzyme';

import { ToggleState } from './ToggleState';

it('renders nominal value without crashing', () => {
  const props = {
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    toggle: {
      key: 'my-first-toggle',
      name: 'My First Toggle',
      value: true
    },
    key: 'my-first-toggle'
  };

  shallow(<ToggleState {...props} />);
});
