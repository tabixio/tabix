import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import appEnv from '@vzh/configs/appEnv';
import App, { AppProps } from 'views/App';
import { RootStore } from 'stores';

const appRootElement = document.getElementById('root')!;

// Keep initial state in variable.
const appState = window.__INITIAL_STATE__;

// Delete node and variable with initial state after keeping initial state in variable.
const initStateElement = document.getElementById('initialStateScript');
if (initStateElement && initStateElement.parentNode) {
  initStateElement.parentNode.removeChild(initStateElement);
  delete window.__INITIAL_STATE__;
}

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

const rootStore = new RootStore(appState);
render(appRootElement, App, rootStore);

if (module.hot) {
  module.hot.accept(['views/App'], () => {
    import('views/App').then(({ default: NextApp }) => render(appRootElement, NextApp, rootStore));
  });

  module.hot.accept(err => {
    console.error('HMR error:', err);
  });
}
