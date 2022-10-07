import { Tab } from 'models';
import { Option, None } from 'funfix-core';
import { JSONModel } from 'module/mobx-utils';
import appStorage from './appStorage';

const tabsKey = `tabs`;
const tabsActiveKey = `${tabsKey}.active`;

type Tabs = JSONModel<ReadonlyArray<Tab>>;

export async function saveActiveTabId(id?: string) {
  try {
    if (!id) await appStorage.removeItem(tabsActiveKey);
    else await appStorage.setItem(tabsActiveKey, id);
  } catch (e) {
    console.error(e);
  }
}

export async function getActiveTabId(): Promise<Option<string>> {
  try {
    const value = await appStorage.getItem<string | undefined>(tabsActiveKey);
    return Option.of(value);
  } catch (e) {
    console.error(e);
    return None;
  }
}

export async function saveTabs(tabs: JSONModel<ReadonlyArray<Tab>>) {
  try {
    await appStorage.setItem(tabsKey, tabs);
    // console.log('Tabs saved at', new Date().toISOString());
  } catch (e) {
    console.error(e);
  }
}

export async function getTabs(): Promise<Tabs> {
  try {
    return (await appStorage.getItem<Tabs>(tabsKey)) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function saveTab(tab: JSONModel<Tab>) {
  try {
    const tabs = await getTabs();
    if (!tabs.length) {
      await saveTabs([tab]);
      return;
    }

    const i = tabs.findIndex((t) => t.id === tab.id);
    const nextTabs = tabs.slice();
    if (i >= 0) {
      nextTabs.splice(i, 1, tab);
    } else {
      nextTabs.push(tab);
    }
    await saveTabs(nextTabs);
  } catch (e) {
    console.error(e);
  }
}
