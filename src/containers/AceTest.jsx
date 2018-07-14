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
const defaultValue=`SELECT field2 , fiels5  FROM DBTABLE | DB2TABLE2 
fack ( fiels5 ) , baz(123)  -- support.function 
var1 , var2 , var3          -- markup.heading
field2,fiels5 ,field1       -- variable.parameter
underline,underline1        -- underline
deprecated deprecated1      -- invalid.deprecated
    
ReplicatedCollapsingMergeTree -- dataTypes
final , typedef | struct | framework | library
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
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
            value={defaultValue}
            name="UNIQUE_ID_OF_DIV"

        />
    </Wrapper>
));
