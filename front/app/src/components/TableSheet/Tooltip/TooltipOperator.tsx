import { Menu, Dropdown, MenuProps } from 'antd';
import { isEmpty, map } from 'lodash';
import React from 'react';
import { TooltipOperatorMenu, S2CellType } from '@antv/s2';
import { Icon } from '../Icons';

interface TooltipOperatorProps {
  onlyMenu: boolean;
  menus?: TooltipOperatorMenu[];
  onClick: MenuProps['onClick'];
  cell: S2CellType;
}

export const TooltipOperator = (props: TooltipOperatorProps) => {
  const { menus, onlyMenu, onClick: onMenuClick, cell } = props;

  const renderTitle = (menu: TooltipOperatorMenu) => {
    return (
      <span onClick={() => menu.onClick?.(cell)}>
        {/*className={`${TOOLTIP_PREFIX_CLS}-operator-icon`}*/}
        {menu.icon && <Icon icon={menu.icon} />}
        {menu.text}
      </span>
    );
  };
  //
  const renderMenu = (menu: TooltipOperatorMenu) => {
    const { key, text, children, onClick } = menu;

    if (!isEmpty(children)) {
      return (
        <Menu.SubMenu title={renderTitle(menu)} key={key} onTitleClick={() => onClick?.(cell)}>
          {map(children, (subMenu: TooltipOperatorMenu) => renderMenu(subMenu))}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item title={text} key={key}>
        {renderTitle(menu)}
      </Menu.Item>
    );
  };

  const renderMenus = () => {
    if (onlyMenu) {
      return (
        <Menu onClick={onMenuClick}>
          {map(menus, (subMenu: TooltipOperatorMenu) => renderMenu(subMenu))}
        </Menu>
      );
    }

    return map(menus, (menu: TooltipOperatorMenu) => {
      const { key, children } = menu;
      const menuRender = !isEmpty(children) ? (
        <Menu onClick={onMenuClick} key={key}>
          {map(children, (subMenu: TooltipOperatorMenu) => renderMenu(subMenu))}
        </Menu>
      ) : (
        <></>
      );

      return (
        <Dropdown key={key} overlay={menuRender} arrow>
          {renderTitle(menu)}
        </Dropdown>
      );
    });
  };
  console.log('menus', menus);
  return <div>{renderMenus()}</div>;
};
