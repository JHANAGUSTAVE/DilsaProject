import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Contact from './Contact';

storiesOf('Contact', module)
    .add('with title', withInfo()(() => (
        <Contact title="Contact title" />
    )));
