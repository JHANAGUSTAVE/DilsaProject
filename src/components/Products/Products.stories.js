import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Products from './Products';

storiesOf('Products', module)
    .add('with title', withInfo()(() => (
        <Products title="Products title" />
    )));
