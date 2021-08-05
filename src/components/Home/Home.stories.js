import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Home from './Home';

storiesOf('Home', module)
    .add('with title', withInfo()(() => (
        <Home title="Home title" />
    )));
