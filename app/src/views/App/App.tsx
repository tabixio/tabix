import React from 'react';
import { reaction, IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { Switch, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { AuthorizationProvider, NotLoggedInRoute, LoggedInRoute } from '@vzh/react-auth';
import { typedInject } from '@vzh/mobx-stores';

import 'assets/styles/global.css';
import { AppStore, Stores } from 'stores';
import { routePaths } from 'routes';
import DashboardView from 'views/DashboardView';
import SignInView from 'views/SignInView';
import SignOut from 'components/SignOut';

export interface InjectedProps {
  store: AppStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class App extends React.Component<RoutedProps> {
  private static toggleAppLoader(loading: boolean) {
    const appRootElement = document.getElementById('root')!;
    appRootElement.classList.toggle('loading', loading);
  }

  protected readonly loadingReaction: IReactionDisposer;

  constructor(props: Readonly<RoutedProps>) {
    super(props);

    const { store } = this.props;

    this.loadingReaction = reaction(
      () => store.uiStore.loading,
      loading => App.toggleAppLoader(loading)
    );

    // store.loadData();
  }

  componentWillUnmount() {
    this.loadingReaction && this.loadingReaction();
    const { store } = this.props;
    store.disposeStores();
  }

  render() {
    const { store } = this.props;

    /* if (
      store.uiStore.loading ||
      (store.isLoggedIn && !store.isProfileLoaded && !store.uiStore.hasError)
    ) {
      // Show loader in html until app data will be loaded.
      return null;
    } */

    // if (store.uiStore.hasError) {
    //   return <AppError error={store.uiStore.notifications[0].text} />;
    // }

    return (
      <AuthorizationProvider
        isLoggedIn={store.isLoggedIn}
        isAuthorized={store.isAuthorized}
        redirectTo={routePaths.signIn.path}
        notLoggedInRedirectTo={routePaths.home.path}
      >
        <Switch>
          <LoggedInRoute exact path={routePaths.home.path}>
            <Redirect to={routePaths.dashboard.path} />
          </LoggedInRoute>

          <NotLoggedInRoute exact path={routePaths.signIn.path} component={SignInView} />

          <LoggedInRoute exact path={routePaths.signOut.path} component={SignOut} />

          <LoggedInRoute path={routePaths.dashboard.path} component={DashboardView} />

          <Redirect to={routePaths.home.path} />
          {/* <Route component={NotFoundView} /> */}
        </Switch>
      </AuthorizationProvider>
    );
  }
}

// Need `withRouter` to work router with mobx `observer`.
export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.appStore }))(App)
);
