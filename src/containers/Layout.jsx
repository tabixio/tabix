import React, { PureComponent } from 'react';
import Logo from 'Layout/Logo.jsx';
import { Navbar, NavbarGroup, Button, Alignment } from '@blueprintjs/core';

export default class Layout extends PureComponent {
    render() {
        const { children } = this.props;

        return [
            <Navbar key="navbar">
                <NavbarGroup align={Alignment.LEFT}>
                    <Logo src="assets/images/logo.png" />
                </NavbarGroup>

                <NavbarGroup align={Alignment.RIGHT}>
                    <Button
                        className="pt-minimal"
                        icon="help"
                        text="REQUIREMENTS & HELP"
                    />
                    <Button
                        className="pt-minimal"
                        icon="segmented-control"
                        text="UI THEME"
                    />
                </NavbarGroup>
            </Navbar>,
            children
        ];
    }
}
