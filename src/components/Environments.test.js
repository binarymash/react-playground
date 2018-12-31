import React from 'react';
import { shallow } from 'enzyme';
import { Environments } from './Environments';

it('renders undefined value without crashing', () => {
  shallow(<Environments />);
});

it('renders nominal value without crashing', () => {
  const props = {
    environments: [
      {
        key: 'my-first-environment',
        name: 'My First Environment'
      },
      {
        key: 'my-new-environment',
        name: 'My new environment'
      }
    ]
  };

  shallow(<Environments {...props} />);
});
