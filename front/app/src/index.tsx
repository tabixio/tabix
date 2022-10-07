import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { supportsHistory } from 'history/DOMUtils';
import { Provider } from 'mobx-react';
import { initStores } from 'stores';
import { connectionsStorage } from 'services';
import App, { AppProps } from 'views/App';

const appRootElement = document.getElementById('root')!;

function render(
  container: HTMLElement,
  Component: React.ComponentType<AppProps>,
  appProps: AppProps,
  store: ReturnType<typeof initStores>,
  cb?: () => void
) {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter forceRefresh={!supportsHistory()}>
        <Component {...appProps} />
      </BrowserRouter>
    </Provider>,
    container,
    cb
  );
}

(async () => {
  const rootStore = initStores();
  const connection = await connectionsStorage.getLastActiveConnection();

  render(appRootElement, App, { connection: connection.orUndefined() }, rootStore);

  if (module.hot) {
    module.hot.accept('views/App', () => {
      import('views/App').then(({ default: NextApp }) => {
        render(
          appRootElement,
          NextApp,
          { connection: connection.orUndefined() },
          rootStore,
          rootStore.reinitialize
        );
      });
    });

    module.hot.accept('stores', () => {
      import('stores').then(({ initStores: nextInitStores }) => {
        const nextStore = nextInitStores();
        rootStore.updateChildStores(nextStore, connection.orUndefined());
        render(appRootElement, App, { connection: connection.orUndefined() }, rootStore);
      });
    });

    module.hot.accept((err) => {
      console.error('HMR error:', err);
    });
  }
})();
