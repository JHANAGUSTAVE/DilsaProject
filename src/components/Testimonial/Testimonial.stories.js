import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Testimonial from './Testimonial';

storiesOf('Testimonial', module)
    .add('with title', withInfo()(() => (
        <Testimonial title="Testimonial title" />
    )));
