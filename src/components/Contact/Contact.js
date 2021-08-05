import React from 'react';
import { string } from 'prop-types';

import {
    Title,
} from './styles';

function Contact ({
    title,
}) {
    return (
        <Title>{title}</Title>
    );
}

Contact.defaultProps = {
    title: "",
};

Contact.propTypes = {
    title: string,
};

export default Contact;
