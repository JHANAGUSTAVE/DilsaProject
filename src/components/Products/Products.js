import React from 'react';
import { string } from 'prop-types';

import {
    Title,
} from './styles';

function Products ({
    title,
}) {
    return (
        <Title>{title}</Title>
    );
}

Products.defaultProps = {
    title: "",
};

Products.propTypes = {
    title: string,
};

export default Products;
