import React from 'react';
import { Flex } from 'reflexy';
import { Authorized } from 'module/react-auth';
import { Dropdown } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import ContextMenu, { ActionType } from './ContextMenu';
import css from './ActionsMenu.css';
import { ProfileTwoTone } from '@ant-design/icons/lib/icons';

export interface ActionsMenuProps {
  onMenuAction: (action: ActionType) => void;
}

export default class ActionsMenu extends React.Component<ActionsMenuProps> {
  private onMenuItemClick = ({ key }: MenuInfo) => {
    const { onMenuAction } = this.props;
    ActionType[key] && onMenuAction(+key as ActionType);
  };

  render() {
    return (
      <Flex grow hfill justifyContent="flex-end" className={css.root}>
        <Authorized>
          <Dropdown overlay={<ContextMenu onClick={this.onMenuItemClick} />} trigger={['click']}>
            <Flex alignItems="center" className={css.actions}>
              <ProfileTwoTone style={{ fontSize: '1.75em' }} />
              {/* <Icon type="down" theme="outlined" /> */}
            </Flex>
          </Dropdown>
        </Authorized>
      </Flex>
    );
  }
}
