import React from 'react';
import { mount } from 'enzyme';

import Home from './Home';

describe('Home component', () => {
    it('should match snapshot', () => {
        expect(mount(<Home />)).toMatchSnapshot();
    });
});
