import { compose, withState, withHandlers } from 'recompose';
import React from 'react';
import {
    AnchorButton,
    Button,
    Classes,
    Dialog,
    Intent
} from '@blueprintjs/core';
import Tabs from './ReqTabs/Tabs.jsx';

const withToggle = compose(
    withState('isOpen', 'toggle', false),
    withHandlers({
        onOpen: ({ toggle }) => () => toggle(true),
        onClose: ({ toggle }) => () => toggle(false)
    })
);

const ReqDialog = ({ themeName, ...props }) => (
    <Dialog {...props} className={themeName}>
        <div className={Classes.DIALOG_BODY}>
            <Tabs />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={props.onClose}>Close</Button>

                <AnchorButton
                    intent={Intent.SUCCESS}
                    href="https://tabix.io/"
                    target="_blank"
                >
                    Visit the Tabix.IO
                </AnchorButton>
            </div>
        </div>
    </Dialog>
);

export default withToggle(({ onOpen, ...props }) => [
    <Button
        key="reqBtn"
        className={Classes.MINIMAL}
        icon="help"
        text="REQUIREMENTS & HELP"
        onClick={onOpen}
    />,
    <ReqDialog key="dialog" {...props} />
]);
