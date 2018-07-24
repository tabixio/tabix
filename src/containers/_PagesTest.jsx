import { getConnection } from '../selectors';
import { connect } from 'react-redux';
import { logout, expandStructure } from '../reducers/app';
import { push } from 'react-router-redux';
import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import SplitterLayout from 'Service/SplitterLayout.jsx';
import { Tree } from '@blueprintjs/core';
import { Navbar, NavbarGroup, Alignment, Classes } from '@blueprintjs/core';
import { Tag,Tabs, Tab, TabId } from "@blueprintjs/core";
import { Card,InputGroup,ContextMenu, ContextMenuTarget, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import Scrollbar from '../components/Service/Scrollbar.jsx';
import _PageEditor  from './_PageEditor.jsx';
import {connectedApi} from 'api';
import {Popover,PopoverInteractionKind, Position} from "@blueprintjs/core/lib/esm/index";

function mapStateToProps(state) {
    return {
        connection: getConnection(state),
        fetching: state.login.fetching,
        structure: state.app.structure
    };
}

function mapDispatchToProps(disaptch) {
    return {
        onLogout: () => {
            disaptch(logout());
            disaptch(push('/login'));
        },
        onExpand: (id, expand) =>
            disaptch(
                expandStructure(id.split(',').map(x => parseInt(x)), expand)
            )
    };
}


const scrollbarConfig = {
    top: '0px',
    bottom: '20px',
};


@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Pages extends Component {
    componentDidMount() {
        // connectedApi().getDatabaseStructure() |> console.warn;
    }
    showContextMenuNewPage(e) {
        if (!e) return;
        e.preventDefault();
        ContextMenu.show(
            <Menu className={Classes.DARK}>
                <MenuItem icon="citation" text="New SQL" />
                <MenuItem icon="series-configuration" text="New DASH" />
            </Menu>,
            { left: e.clientX, top: e.clientY },
            () => {},
            true
        );
    }
    showContextMenuTag(e) {
        if (!e) return;
        e.preventDefault();
        ContextMenu.show(
            <Menu className={Classes.DARK}>
                <MenuItem icon="unpin" text="Pin" />
                {/*<MenuItem icon="map" text="Map" />*/}
                {/*<MenuItem icon="th" text="Table" shouldDismissPopover={false} />*/}
                {/*<MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />*/}

                <MenuItem icon="cog" text="Set color">
                    <MenuItem icon="add" text="Add new application" disabled={true} />
                    <MenuItem icon="remove" text="Remove application" />
                </MenuItem>
                <MenuDivider />
                {/*<MenuItem icon="search-around" text="Search around..." />*/}
                {/*<MenuItem icon="search" text="Object viewer" />*/}
                {/*<MenuItem icon="graph-remove" text="Remove" />*/}
                {/*<MenuItem icon="group-objects" text="Group" />*/}
                {/*<MenuDivider />*/}
                <InputGroup large={false} placeholder="Tab name" type="text" defaultValue="SQL 12"/>
            </Menu>,
            { left: e.clientX, top: e.clientY },
            () => {},
            true
        );
    }

    render() {
        const { connection, fetching, structure } = this.props;

        console.log("structure",structure);
        const tabs=Array.from(Array(32).keys());
        const tabElements = tabs.map(tag => {
            return (<Tab id={`TabId${tag}`}
                         // title={`TabId${tag}`}
                         panel={<ReactPanel />} />);
        });
        const tagElements = tabs.map(tag => {
            const onRemove = () => console.warn('onRemove',tag);
            const onClick = () => console.warn('onClick',tag);
            let rand=Math.floor(Math.random() * 100) ;
            let icon='citation';
            let title=`SQL ${tag}`;
            let right=false;
            let intent='';

            if (rand>70) {
                icon='series-configuration'; // dash
                title=`Dash ${tag}`;
                intent='primary';
            }
            return (
                <Tag
                    key={tag}
                    onClick={onClick}
                    active={tag==2}
                    rightIcon={right}
                    intent={intent}
                    // intent={'primary'}
                    onRemove={onRemove}
                    interactive={true}
                    icon={icon}
                    onContextMenu={this.showContextMenuTag}
                    style={{marginLeft:5+'px',marginRight:5+'px',marginBottom:3+'px',marginTop:3+'px'}}
                >
                    {title}
                </Tag>
            );
        });
        return (
            <SplitterLayout>
                <Tree
                    contents={structure}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    onNodeClick={this.handleNodeClick}
                />
                <div>
                    <div className={'TagLists'}>
                            <Tag
                                key='NewPage'
                                onClick={this.showContextMenuNewPage}
                                active={true}
                                intent={'warning'}
                                interactive={true}
                                icon={'plus'}
                                style={{marginLeft:5+'px',marginRight:5+'px',marginBottom:3+'px',marginTop:3+'px'}}
                            >
                                New
                            </Tag>
                        {tagElements}
                    </div>
                    <Tabs
                        id="TabsExample"
                        renderActiveTabPanelOnly
                    >
                        {tabElements}
                    </Tabs>

                </div>
            </SplitterLayout>
        );
    }

    handleNodeCollapse = node => this.props.onExpand(node.id, false);

    handleNodeExpand = node => this.props.onExpand(node.id, true);

    handleNodeClick = node =>
        node.childNodes && node.childNodes.length &&
        this.props.onExpand(node.id, !node.isExpanded);
}


const ReactPanel = () => (
    <div  style={{border:'0px solid red',width:100+'%',minHeight:500+'px',height:100+'%'}}>
        <_PageEditor></_PageEditor>
    </div>
);

