import React, { Component } from 'react';
import {Popover,PopoverInteractionKind,Menu,MenuItem,MenuDivider, Button,AnchorButton,ButtonGroup,Position } from "@blueprintjs/core";
import AceEditor from "../components/Ace/Ace.js";
import SplitterLayout from 'Service/SplitterLayout.jsx';
import {Classes, ContextMenu} from "@blueprintjs/core/lib/esm/index";
import {connectedApi} from 'api';


const dataSources = {
    col1: [1, 2, 3], // eslint-disable-line no-magic-numbers
    col2: [4, 3, 2], // eslint-disable-line no-magic-numbers
    col3: [17, 13, 9], // eslint-disable-line no-magic-numbers
};

const dataSourceOptions = Object.keys(dataSources).map(name => ({
    value: name,
    label: name,
}));

const config = {editable: true};


export default class _PageEditor extends Component {
    constructor() {
        super();
        // console.warn(connectedApi());
        //
        //
        this.state = {data: [], layout: {}, frames: [],DatabaseStructure:false};
    }
    componentDidMount() {

        if (connectedApi()) {
            connectedApi().getDatabaseStructure() |> console.log;
            // this.state.DatabaseStructure=connectedApi().getDatabaseStructure();
        }

    }

    listDatabasePopover() {
        return (
            <Menu className={Classes.DARK}>
                <MenuItem text="system"         />
                <MenuItem text="model"          />
                <MenuItem text="ads"            />
                <MenuItem text="default" disabled={true} />
            </Menu>
        );
    }


    renderListDatabaseButton() {
        let currentDatase='default';

        return (
            <Popover content={this.listDatabasePopover()} position={Position.RIGHT_TOP} interactionKind={PopoverInteractionKind.HOVER}>
                <Button minimal rightIcon='caret-down' icon='database' text={currentDatase} minimal={true} />
            </Popover>
        );
    }
    render() {
        const id='aceId'+Date.now().toString();
        return (
            <div style={{display: 'table', width: '100%',height:'inherit'}}>
                {/*<SplitterLayout vertical>*/}
                    <div>
                        <AceEditor
                            mode="clickhouse" focus={true}
                            theme="cobalt" fontSize="14"
                            width="100%"
                            minHeight="200px"
                            height="inherit"
                            value="SELECT FROM table"
                            name={id}
                            style={{minHeight:'250px'}}
                            // dataStructure={dataStructure}
                            // currentDatabaseName={currentDatabaseName}

                        />


                    </div>
                    <div>
                        <ButtonGroup style={{ minWidth: 200 }} minimal>
                            <Button icon="fast-forward" intent="success" minimal>Run all ⇧ + ⌘ + ⏎</Button>
                            <Button icon="play" minimal>Run current</Button>
                            <AnchorButton icon="cog" minimal>Options</AnchorButton>
                            {this.renderListDatabaseButton()}
                        </ButtonGroup>
                        <hr />




                    </div>
                {/*</SplitterLayout>*/}
            </div>
        );
    }
}