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
const defaultValue=`73709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
;;
SELECT arrayFilter(x -> x LIKE '%World%', ['Hello', 'abc World']) AS res
;;
SELECT field2 , sin(number) as sin  FROM system.numbers
sin( cos(DepTimeBlk) ) , bar(123)  -- support.function 
var1 , var2 , var3          -- markup.heading
 OriginWac,DepTimeBlk,DepTime,OriginAirportSeqID      -- variable.parameter
true|false|NULL    -- const
system.numbers_mt | system.numbers -- tables
ReplicatedCollapsingMergeTree -- dataTypes
SYSTEM RELOAD CONFIG -- doubleSysWord

CREATE TABLE IF NOT EXISTS all_hits ON CLUSTER cluster (p Date, i Int32) ENGINE = Distributed(cluster, default, hits)
DROP DATABASE IF EXISTS db ON CLUSTER cluster
SHOW TEMPORARY TABLES FROM default LIKE 'pattern' INTO OUTFILE filename FORMAT JSON
SELECT s, arr, a FROM arrays_test ARRAY JOIN arr AS a
;;
SELECT
    domainWithoutWWW(URL) AS domain,
    domainWithoutWWW(REFERRER_URL) AS referrer,
    device_type,
    count() cnt
FROM hits
GROUP BY domain, referrer, device_type
ORDER BY cnt DESC
LIMIT 5 BY domain, device_type
LIMIT 100
;;
 1, 18446744073709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
;;
1 + 2 * 3 + 4
;;
SELECT arrayFilter(x -> x LIKE '%World%', ['Hello', 'abc World']) AS res
 

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
        <AceEditor
            mode="clickhouse" focus={true}
            theme="darcula"
            width="100%"
            dataStructure={dataStructure}
            currentDatabaseName={currentDatabaseName}
            value={defaultValue}
            name="UNIQUE_ID_OF_DIV"

        />
    </Wrapper>
));
