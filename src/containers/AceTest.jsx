import styled from 'styled-components';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import React from 'react';
import HotTable from '../components/Handsontable/HotTable.jsx';
import Api from '../api';
import { Spinner } from '@blueprintjs/core';
import AceEditor from "../components/Ace/Ace.js";
import loginConst from "../constants/login";

const connection = {
    host: 'http://tabix.dev7:8123/',
    login: 'default',
    password: ''
};


const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 200px;
`;


const withUserData = lifecycle({
    state: {
        isFetching: false,
        data: []
    },
    async componentDidMount() {
        this.currentDatabaseName='default';
        this.setState({ isFetching: true });

        const api = new Api(connection);
        try {
            await api.init();
        } catch (e) {
            console.error(e);
            return false;
        }
        this.setState({
            isFetching: false,
            dataStructure: api.getDatabaseStructure(),
            currentDatabaseName:'default'
        });
    }
});

const fetchingData = ({ isFetching }) => isFetching;

const withSpinnerWhileFetch = branch(fetchingData, renderComponent(Spinner));

const enhance = compose(
    withUserData,
    withSpinnerWhileFetch
);

export default enhance(({ dataStructure,currentDatabaseName }) => (
    <Wrapper>
      <pre>ACE TEST PAGE</pre>
        <AceEditor
            mode="clickhouse" focus={true}
            theme="cobalt"
            dataStructure={dataStructure}
            currentDatabaseName={currentDatabaseName}
            name="UNIQUE_ID_OF_DIV"

        />
    </Wrapper>
));
