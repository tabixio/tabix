import classname from 'libs/components/classname';
import React from 'react';
import { FormGroup, Classes } from '@blueprintjs/core';

const errorClass = (haveError, className) =>
    classname({ [Classes.INTENT_DANGER]: haveError }, className);

export default ({
    placeholder,
    id,
    input: inputForm,
    hidden,
    meta: { touched, error },
    type = 'text',
    ...props
}) => (
    <FormGroup labelFor={id} {...props} {...errorClass(touched && error)}>
        <input
            id={id}
            placeholder={placeholder}
            {...errorClass(touched && error, Classes.INPUT)}
            {...inputForm}
            hidden={hidden}
            type={type}
        />
    </FormGroup>
);
