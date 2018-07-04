import { connect } from 'react-redux';
import classname from 'libs/components/classname';
import { enableDarkTheme } from '../actions/app';
import React, { PureComponent } from 'react';
import Logo from 'Layout/Logo.jsx';
import MainButtons from 'Layout/Buttons/MainButtons.jsx';
import { Navbar, NavbarGroup, Alignment, Classes } from '@blueprintjs/core';
import Footer from 'Layout/Footer.jsx';

const version = require('../../package.json').version;

function mapStateToProps(state) {
    return {
        darkTheme: state.app.darkTheme
    };
}

function mapDispatchToProps(disaptch) {
    return {
        onEnableDarkTheme: enable => enable |> enableDarkTheme |> disaptch
    };
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Layout extends PureComponent {
    render() {
        const { children, darkTheme, onEnableDarkTheme } = this.props;

        return (
            <div {...classname({ [Classes.DARK]: darkTheme })}>
                <Navbar key="navbar">
                    <NavbarGroup align={Alignment.LEFT}>
                        <Logo src="assets/images/logo.png" />
                    </NavbarGroup>

                    <NavbarGroup align={Alignment.RIGHT}>
                        <MainButtons onEnableDarkTheme={onEnableDarkTheme} />
                    </NavbarGroup>
                </Navbar>
                {children}
                <Footer key="footer">
                    <a href="https://tabix.io/" target="_blank">
                        Tabix.IO
                    </a>{' '}
                    by Tabix LLC ©, all rights reserved. Build {version}
                </Footer>
            </div>
        );
    }
}
