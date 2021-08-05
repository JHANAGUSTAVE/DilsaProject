import React from 'react';
import { mount } from 'enzyme';

import Services from './Services';

describe('Services component', () => {
    it('should match snapshot', () => {
        expect(mount(<Services />)).toMatchSnapshot();
    });
});
