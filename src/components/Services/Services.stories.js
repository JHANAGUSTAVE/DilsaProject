import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Services from './Services';

storiesOf('Services', module)
    .add('with title', withInfo()(() => (
        <Services title="Services title" />
    )));
