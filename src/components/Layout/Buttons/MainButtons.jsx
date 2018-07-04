import React from 'react';
import { Button, Classes, CollapsibleList, MenuItem } from '@blueprintjs/core';

export default ({ onEnableDarkTheme }) => [
    <Button
        key="btn1"
        className="pt-minimal"
        icon="help"
        text="REQUIREMENTS & HELP"
    />,
    <CollapsibleList
        key="btn2"
        className={Classes.BREADCRUMBS}
        visibleItemCount={0}
        visibleItemRenderer={f => f}
        dropdownTarget={
            <Button
                key="btn2"
                className="pt-minimal"
                icon="segmented-control"
                text="UI THEME"
            />
        }
    >
        <MenuItem
            key="dark"
            onClick={() => onEnableDarkTheme(true)}
            icon="moon"
            text="Dark theme"
        />
        <MenuItem
            key="light"
            onClick={() => onEnableDarkTheme(false)}
            icon="flash"
            text="Light theme"
        />
    </CollapsibleList>
];
