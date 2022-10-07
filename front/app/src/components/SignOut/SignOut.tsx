import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { typedInject } from 'module/mobx-utils';
import { AppStore, Stores } from 'stores';

interface InjectedProps {
  store: AppStore;
}

type Props = InjectedProps & RouteComponentProps<any>;

function SignOut({ store, history }: Props) {
  useEffect(() => {
    store.logout(history);
  }, []);

  return null;
}

export default withRouter(
  typedInject<InjectedProps, Props, Stores>(({ store }) => ({ store: store.appStore }))(SignOut)
);
