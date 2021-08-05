import React from 'react';
import { mount } from 'enzyme';

import Testimonial from './Testimonial';

describe('Testimonial component', () => {
    it('should match snapshot', () => {
        expect(mount(<Testimonial />)).toMatchSnapshot();
    });
});
