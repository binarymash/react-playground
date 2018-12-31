import React from 'react';
import { shallow } from 'enzyme';
import { Key } from './Key';

it('renders undefined value without crashing', () => {
  shallow(<Key />);
});

it('renders nominal value without crashing', () => {
  const props = {
    value: 'abc'
  };

  shallow(<Key {...props} />);
});
