import React from 'react';
import { Layout, notification } from 'antd';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { IReactionDisposer, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { UIStore } from '@vzh/mobx-stores';
import { RootStore } from 'stores';
import Loader from 'components/Loader';
import css from './Page.css';

interface Props extends FlexProps {
  uiStore?: UIStore<RootStore>;
  children?: React.ReactNode;
}

@observer
export default class Page extends React.Component<Props> {
  private readonly notificationReaction: IReactionDisposer;

  constructor(props: Props) {
    super(props);

    this.notificationReaction = reaction(
      () => {
        const { uiStore } = this.props;
        return uiStore && uiStore.notifications;
      },
      list =>
        list &&
        list.forEach(n => {
          notification.open({
            key: n.id.toString(),
            type: n.type,
            message: n.text,
            description: '',
            duration: 0,
            onClose: () => {
              const { uiStore } = this.props;
              uiStore && uiStore.closeNotification(n.id);
            },
          });
        }),
      { fireImmediately: true }
    );
  }

  componentWillUnmount() {
    this.notificationReaction();
  }

  render() {
    const { uiStore, className, ...rest } = this.props;
    const showLoader = uiStore && uiStore.loading;
    // hide page loader while showing app loader to avoid double loaders
    // (!store.uiStore.loading || uiStore === store.uiStore);
    return (
      <Layout className={css.root}>
        {showLoader && <Loader />}

        <Flex
          column
          hfill
          grow
          shrink={false}
          component={<main />}
          className={classNames(css['main-container'], className)}
          {...rest}
        />
      </Layout>
    );
  }
}
