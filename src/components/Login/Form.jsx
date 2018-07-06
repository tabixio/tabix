import styled from 'styled-components';
const R = require('ramda');
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@blueprintjs/core';
import Input from '../Shared/Input.jsx';

const ButtonArea = styled.div`
    button {
        width: 100%;
    }
`;

const required = value => !value && 'required';

const commonValidate = values => ({
    name: required(values.name)
});

export const validateServer = values =>
    values |> commonValidate |> R.assoc('server', required(values.server));

export const validateDirect = values =>
    values |> commonValidate |> R.assoc('host', required(values.host));

const Form = ({ handleSubmit, mode, valid }) => (
    <form onSubmit={handleSubmit}>
        <Field name="name" component={Input} label="Name" placeholder="dev" />
        {mode === 'server' && (
            <Field
                name="server"
                component={Input}
                label="url"
                placeholder="https://tabix.dev/s1"
            />
        )}
        {mode === 'server' && (
            <Field
                name="config"
                component={Input}
                label="Config key"
                placeholder="empty"
            />
        )}
        {mode === 'direct' && (
            <Field
                name="host"
                component={Input}
                label="http://host:port"
                placeholder="http://127.0.0.1:8123"
            />
        )}
        <Field name="login" component={Input} label="login" />
        <Field name="password" component={Input} label="password" />
        {mode === 'direct' && (
            <Field
                name="params"
                component={Input}
                label="Extend params query"
                placeholder="key1=value&key2=value"
            />
        )}
        <ButtonArea>
            <Button text="SIGN IN" type="submit" disabled={!valid} />
        </ButtonArea>
    </form>
);

export default reduxForm()(Form);
