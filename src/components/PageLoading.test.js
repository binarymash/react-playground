import React from 'react';
import { shallow } from 'enzyme';
import { PageLoading } from './PageLoading';

it('renders without crashing', () => {
  shallow(<PageLoading />);
});
