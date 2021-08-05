import React from 'react';
import { mount } from 'enzyme';

import Contact from './Contact';

describe('Contact component', () => {
    it('should match snapshot', () => {
        expect(mount(<Contact />)).toMatchSnapshot();
    });
});
