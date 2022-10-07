import React from 'react';
import { Layout, Modal, notification } from 'antd';
import Markdown from 'markdown-to-jsx';
import remarkGfm from 'remark-gfm';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { IReactionDisposer, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { NotificationType, UIStore } from 'module/mobx-utils';
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
      (list) =>
        list &&
        list.forEach((n) => {
          if (n.showModal) {
            // Show
            Modal.error({
              title: n.title,
              content: (
                <Markdown remarkPlugins={[remarkGfm]}>
                  {(n.description ?? 'NULL').toString()}
                </Markdown>
              ),
            });
          } else {
            notification.open({
              key: n.id.toString(),
              type: n.type,
              message: n.text,
              description: n.description,
              style: {
                width: 600,
                marginLeft: 335 - 600,
              },
              // duration: 30,
              onClose: () => {
                const { uiStore } = this.props;
                uiStore && uiStore.closeNotification(n.id);
              },
            });
          }
        }),
      { fireImmediately: true }
    );
  }

  componentDidMount() {
    // Mount?
  }

  componentWillUnmount() {
    this.notificationReaction();
  }

  renderPage() {
    const { uiStore, className, ...rest } = this.props;
    // hide page loader while showing app loader to avoid double loaders
    // (!store.uiStore.loading || uiStore === store.uiStore);

    return (
      <Flex
        column
        hfill
        grow
        shrink={false}
        component={<main />}
        className={classNames(css['main-container'], className)}
        {...rest}
      />
    );
  }

  render() {
    const { uiStore, className, ...rest } = this.props;
    const showLoader = uiStore && uiStore.loading;

    return (
      <Layout className={css.root}>
        {showLoader && <Loader />}
        {this.renderPage()}
      </Layout>
    );
  }
}
