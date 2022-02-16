import React from 'react';
import { IReactionDisposer, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect, RouteComponentProps, Switch, withRouter } from 'react-router';
import { AuthorizationProvider, LoggedInRoute, NotLoggedInRoute } from 'module/react-auth';
import { typedInject } from 'module/mobx-utils';

import 'assets/styles/global.css';
import { AppStore, Stores } from 'stores';
import { routePaths } from 'routes';
import { Connection } from 'services';
import AppErrorBoundary from 'components/AppErrorBoundary';
import DashboardView from 'views/DashboardView';
import SignInView from 'views/SignInView';
import SignOut from 'components/SignOut';

export interface InjectedProps {
  store: AppStore;
}

export interface Props extends InjectedProps {
  connection?: Connection;
}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class App extends React.Component<RoutedProps> {
  private static toggleAppLoader(loading: boolean) {
    const appRootElement = document.getElementById('root')!;
    appRootElement.classList.toggle('loading', loading);
  }

  protected loadingReaction?: IReactionDisposer;

  componentDidMount() {
    // console.log('App->componentDidMount');
    const { store, connection } = this.props;

    this.loadingReaction = reaction(
      () => store.uiStore.loading,
      (loading) => App.toggleAppLoader(loading)
    );

    connection && !store.isLoggedIn && store.initApi(connection);
  }

  componentWillUnmount() {
    this.loadingReaction && this.loadingReaction();
    const { store } = this.props;
    store.disposeStores();
  }

  render() {
    const { store } = this.props;

    if (store.uiStore.loading) {
      // Show loader in html until app data will be loaded.
      return null;
    }

    const error = store.uiStore.hasError ? store.uiStore.notifications[0].text : '';
    return (
      <AppErrorBoundary error={error}>
        <AuthorizationProvider
          isLoggedIn={store.isLogIn}
          isAuthorized={store.isAuthorized}
          redirectTo={routePaths.signIn.path}
          notLoggedInRedirectTo={routePaths.home.path}
        >
          <Switch>
            <NotLoggedInRoute exact path={routePaths.signIn.path} component={SignInView} />

            <LoggedInRoute exact path={routePaths.signOut.path} component={SignOut} />

            <LoggedInRoute exact path={routePaths.dashboard.path} component={DashboardView} />

            <LoggedInRoute exact path={routePaths.home.path}>
              <Redirect to={routePaths.dashboard.path} />
            </LoggedInRoute>

            <Redirect to={routePaths.home.path} />
          </Switch>
        </AuthorizationProvider>
      </AppErrorBoundary>
    );
  }
}

// Need `withRouter` to work router with mobx `observer`.
export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.appStore }))(App)
);
