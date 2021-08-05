import React from 'react';
import { string } from 'prop-types';

import {
    Title,
} from './styles';

function Home ({
    title,
}) {
    return (
        <Title>{title}</Title>
    );
}

Home.defaultProps = {
    title: "",
};

Home.propTypes = {
    title: string,
};

export default Home;
