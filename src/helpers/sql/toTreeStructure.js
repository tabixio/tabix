const iconEngine = engine => {
    switch (engine) {
    case 'Distributed':
        return 'vertical-distribution';
    case 'ReplicatedMergeTree':
        return 'th';
    case 'View':
        return 'th';
    case 'ReplicatedSummingMergeTree':
        return 'join-table';
    case 'Dictionary':
        return 'list-detail-view';
    default:
        return 'help';
    }
};

export const nodeId = (...arg) =>
    arg.reduce((accum, x) => `${accum},${x}`, '0');

export default structure => [
    {
        id: '0',
        icon: 'properties',
        label: 'Clickhouse Server',
        isExpanded: true,
        //databases
        childNodes: structure.databases.map((x, dInd) => ({
            id: nodeId(dInd),
            icon: 'database',
            label: x.name,
            isExpanded: false,
            secondaryLabel: structure.tables.filter(t => t.database === x.name).length,
            //tables of database
            childNodes: structure.tables
                .filter(t => t.database === x.name)
                .map((t, tInd) => ({
                    id: nodeId(dInd, tInd),
                    label: t.name,
                    icon: iconEngine(t.engine),
                    isExpanded: false,
                    //columns of table
                    childNodes: structure.columns
                        .filter(
                            c => c.database === t.database && c.table === t.name
                        )
                        .map((c, cInd) => ({
                            id: nodeId(dInd, tInd, cInd),
                            label: c.name,
                            secondaryLabel: c.type
                        }))
                }))
        }))
    }
];
