import React from 'react';
import { reaction, IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { Switch, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { AuthorizationProvider, NotLoggedInRoute } from '@vzh/react-auth';
import { typedInject } from '@vzh/mobx-stores';

import 'assets/styles/global.css';
import { AppStore, Stores } from 'stores';
import { routePaths } from 'routes';
// import HomeView from 'views/HomeView';
import SignInView from 'views/SignInView';

export interface InjectedProps {
  store: AppStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

class App extends React.Component<RoutedProps> {
  private loadingReaction: IReactionDisposer | null = null;

  private toggleAppLoader(loading: boolean) {
    const appRootElement = document.getElementById('root')!;
    appRootElement.classList.toggle('loading', loading);
  }

  componentWillMount() {
    console.log('App Will Mount');
  }

  componentDidMount() {
    const { store } = this.props;

    this.loadingReaction = reaction(
      () => store.uiStore.loading,
      loading => this.toggleAppLoader(loading)
    );

    store.loadData();
  }

  componentWillUnmount() {
    this.loadingReaction && this.loadingReaction();
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
          {/* <Route exact path={routePaths.home.path} component={HomeView} /> */}

          <NotLoggedInRoute exact path={routePaths.home.path}>
            <Redirect to={routePaths.signIn.path} />
          </NotLoggedInRoute>

          <NotLoggedInRoute exact path={routePaths.signIn.path} component={SignInView} />
          {/* <LoggedInRoute path={routePaths.dashboard.path} component={DashboardView} /> */}
          {/* <Route component={NotFoundView} /> */}
        </Switch>
      </AuthorizationProvider>
    );
  }
}

// Need `withRouter` to work router with mobx `observer`.
export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.appStore }))(
    observer(App)
  )
);
