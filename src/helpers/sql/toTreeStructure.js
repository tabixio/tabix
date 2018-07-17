const iconEngine = engine => {
    let icon='th-list';
    if (engine.match(/Dictionary.*/))  icon='library';
    if (engine.match(/MaterializedView.*/))  icon='duplicate';
    if (engine.match(/Dictionary.*/))  icon='git-repo';
    if (engine.match(/Distributed.*/))  icon='send-to-graph';
    if (engine.match(/SummingMergeTree.*/))  icon='collapse-all';
    if (engine.match(/CollapsingMergeTree.*/))  icon='layout-sorted-clusters';
    if (engine.match(/AggregatingMergeTree.*/))  icon='delta';
    if (engine.match(/.*Log.*/))  icon='home';
    if (engine.match(/$Merge^/))  icon='pulse';
    return icon;
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
            hasCaret:false,
            secondaryLabel: structure.tables.filter(t => t.database === x.name).length,
            //tables of database
            childNodes: structure.tables
                .filter(t => t.database === x.name)
                .map((t, tInd) => ({
                    id: nodeId(dInd, tInd),
                    label: t.name,
                    hasCaret:false,
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
