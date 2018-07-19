import lsConst from '../constants/localStorage';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import classname from 'libs/components/classname';
import { getFromStorage } from '../helpers/storage';
import { loadConnections } from '../reducers/login';
import { enableDarkTheme, init } from '../reducers/app';
import Logo from 'Layout/Logo.jsx';
import ReqButton from 'Layout/Buttons/ReqButton.jsx';
import ThemeButton from 'Layout/Buttons/ThemeButton.jsx';
import { Navbar, NavbarGroup, Alignment, Classes } from '@blueprintjs/core';
import Footer from 'Layout/Footer.jsx';
import { Fill } from 'Shared/styled';

const App = styled.div`
    background-color: #f5f8fa;
    display: flex;
    flex-direction: column;
    margin: auto;
    min-height: 100vh;
    max-width: 100vw;
    position: relative;
    ${props =>
        props.dark &&
        css`
            background-color: #293742;
        `};
`;

const AppContent = styled.div`
    flex: 1;
    position: relative;
`;

const { version } = require('../../package.json');

function mapStateToProps(state) {
    return {
        darkTheme: state.app.darkTheme,
        path: state.routing.location.pathname
    };
}

function mapDispatchToProps(disaptch) {
    return {
        onEnableDarkTheme: enable => enable |> enableDarkTheme |> disaptch,
        onLoadConnections: connections =>
            connections |> loadConnections |> disaptch,
        onInit: () => disaptch(init())
    };
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Layout extends PureComponent {
    componentDidMount() {
        //load connections from storage
        const { onLoadConnections, onInit } = this.props;

        const connections =
            lsConst.CONNECTIONS |> getFromStorage('[]') |> JSON.parse;

        connections |> onLoadConnections |> onInit;
    }

    render() {
        const { children, darkTheme, onEnableDarkTheme } = this.props;

        return (
            <App
                {...classname({ [Classes.DARK]: darkTheme })}
                dark={darkTheme}
                innerRef={e => (this.node = e)}
            >
                <Fill>
                    <Navbar key="navbar">
                        <NavbarGroup align={Alignment.LEFT}>
                            <Logo src="assets/images/logo.png" />
                        </NavbarGroup>

                        <NavbarGroup align={Alignment.RIGHT}>
                            <ReqButton
                                title={`Tabix.io Build ${version}`}
                                themeName={darkTheme && Classes.DARK}
                            />
                            <ThemeButton
                                onEnableDarkTheme={onEnableDarkTheme}
                            />
                        </NavbarGroup>
                    </Navbar>
                </Fill>
                <AppContent>{children}</AppContent>
                <Footer key="footer">
                    <a href="https://tabix.io/" target="_blank">
                        Tabix.IO
                    </a>{' '}
                    by Tabix LLC ©, all rights reserved. Build {version}
                </Footer>
            </App>
        );
    }
}
