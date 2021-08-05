import React from 'react';
import { mount } from 'enzyme';

import Products from './Products';

describe('Products component', () => {
    it('should match snapshot', () => {
        expect(mount(<Products />)).toMatchSnapshot();
    });
});
