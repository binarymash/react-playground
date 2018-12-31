import React from 'react';
import { shallow } from 'enzyme';
import { Environment } from './Environment';

it('renders undefined value without crashing', () => {
  shallow(<Environment />);
});

it('renders nominal value without crashing', () => {
  const props = {
    environment: {
      projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      key: 'my-first-environment',
      name: 'My First Environment',
      audit: {
        created: '2018-12-27T11:48:19.7507748+00:00',
        createdBy: 'SystemUser',
        lastModified: '2018-12-27T11:48:19.7507748+00:00',
        lastModifiedBy: 'SystemUser',
        version: 1
      }
    }
  };

  shallow(<Environment {...props} />);
});
