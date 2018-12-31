import React from 'react';
import { shallow } from 'enzyme';

import { Project } from './Project';

it('renders undefined value without crashing', () => {
  shallow(<Project />);
});

it('renders nominal value without crashing', () => {
  const props = {
    project: {
      id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      name: 'My First Project'
    }
  };

  shallow(<Project {...props} />);
});
