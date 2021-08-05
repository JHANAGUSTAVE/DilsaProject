import React from 'react';
import { string } from 'prop-types';

import {
    Title,
} from './styles';

function Testimonial ({
    title,
}) {
    return (
        <Title>{title}</Title>
    );
}

Testimonial.defaultProps = {
    title: "",
};

Testimonial.propTypes = {
    title: string,
};

export default Testimonial;
