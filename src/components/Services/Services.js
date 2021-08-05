import React from 'react';
import { string } from 'prop-types';

import {
    Title,
} from './styles';

function Services ({
    title,
}) {
    return (
        <Title>{title}</Title>
    );
}

Services.defaultProps = {
    title: "",
};

Services.propTypes = {
    title: string,
};

export default Services;
