import React from 'react';
import { Button, Classes, CollapsibleList, MenuItem } from '@blueprintjs/core';

export default ({ onEnableDarkTheme }) => (
    <CollapsibleList
        className={Classes.BREADCRUMBS}
        visibleItemCount={0}
        visibleItemRenderer={f => f}
        dropdownTarget={
            <Button
                key="btn2"
                className={Classes.MINIMAL}
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
);
