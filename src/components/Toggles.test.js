import React from 'react';
import { shallow } from 'enzyme';

import { Toggles } from './Toggles';

it('renders undefined value without crashing', () => {
  shallow(<Toggles />);
});

it('renders nominal value without crashing', () => {
  const props = {
    toggles: [
      {
        key: 'my-first-toggle',
        name: 'My First Toggle'
      },
      {
        key: 'my-second-toggle',
        name: 'My Second Toggle'
      }
    ]
  };

  shallow(<Toggles {...props} />);
});
