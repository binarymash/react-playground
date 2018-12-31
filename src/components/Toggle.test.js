import React from 'react';
import { shallow } from 'enzyme';

import { Toggle } from './Toggle';

it('renders undefined value without crashing', () => {
  shallow(<Toggle />);
});

it('renders nominal value without crashing', () => {
  const props = {
    toggle: {
      projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      key: 'my-first-toggle',
      name: 'My First Toggle',
      audit: {
        created: '2018-12-27T11:48:19.8836223+00:00',
        createdBy: 'SystemUser',
        lastModified: '2018-12-27T11:48:19.8836223+00:00',
        lastModifiedBy: 'SystemUser',
        version: 3
      }
    }
  };

  shallow(<Toggle {...props} />);
});
