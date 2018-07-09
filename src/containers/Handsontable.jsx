import styled from 'styled-components';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import React from 'react';
import HotTable from '../components/Handsontable/HotTable.jsx';
import Api from '../api';
import { Spinner } from '@blueprintjs/core';

const connection = {
    host: 'http://tabix.dev7:8123/',
    login: 'default',
    password: ''
};

const query =
    'select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: auto;
`;

const withUserData = lifecycle({
    state: {
        isFetching: false,
        data: []
    },
    componentDidMount() {
        const api = new Api(connection);
        this.setState({ isFetching: true });

        api.fetch(query).then(data =>
            this.setState({
                isFetching: false,
                data: data
            })
        );
    }
});

const fetchingData = ({ isFetching }) => isFetching;

const withSpinnerWhileFetch = branch(fetchingData, renderComponent(Spinner));

const enhance = compose(
    withUserData,
    withSpinnerWhileFetch
);

export default enhance(({ data }) => (
    <Wrapper>
        <HotTable dark="true" data={data} />
    </Wrapper>
));
