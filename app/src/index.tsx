import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import appEnv from '@vzh/configs/appEnv';
import App, { AppProps } from 'views/App';
import { RootStore } from 'stores';
import { localStorage } from 'services';

const appRootElement = document.getElementById('root')!;

function render(
  container: HTMLElement,
  Component: React.ComponentType<AppProps>,
  store: RootStore
) {
  const supportsHistory = 'pushState' in window.history;
  return (appEnv.ssr ? ReactDOM.hydrate : ReactDOM.render)(
    <Provider store={store}>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Component />
      </BrowserRouter>
    </Provider>,
    container
  );
}

const lastActiveConnection = localStorage.getLastActiveConnection();
const rootStore = new RootStore({
  appStore: {
    connection: lastActiveConnection.orUndefined(),
    connectionList: localStorage.getConnections(),
  },
});

render(appRootElement, App, rootStore);

if (module.hot) {
  module.hot.accept(['views/App'], () => {
    import('views/App').then(({ default: NextApp }) => render(appRootElement, NextApp, rootStore));
  });

  module.hot.accept(err => {
    console.error('HMR error:', err);
  });
}
