import React from 'react';
import { shallow, expect } from 'enzyme';
import { Audit } from './Audit';

it('renders undefined value without crashing', () => {
  shallow(<Audit />);
});

it('renders nominal value without crashing', () => {
  const props = {
    audit: {
      created: '2018-12-27T11:48:19.5302129+00:00',
      createdBy: 'Someone',
      lastModified: '2018-12-27T12:01:20.7401734+00:003',
      lastModifiedBy: 'Someone else'
    }
  };

  shallow(<Audit {...props} />);
});
