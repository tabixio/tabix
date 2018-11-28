import EventEmitter from 'services/EventEmitter';
import appStorage from './appStorage';

export enum EventType {
  UpdateHistory = 'UpdateHistory',
}

export const eventBus = new EventEmitter<EventType>();

const key = 'sqlHistory';
const maxItems = 30;

export async function addItems(sql: ReadonlyArray<string>) {
  try {
    const items = await getItems();
    const uniqueItems: string[] = [];

    const fromIndex = items.length - sql.length;
    sql.forEach(item => {
      if (!items.includes(item, fromIndex)) {
        uniqueItems.push(item);
      }
    });

    const offset = items.length + uniqueItems.length - maxItems;
    const nextItems =
      offset > 0 ? items.concat(...uniqueItems).slice(offset) : items.concat(...uniqueItems);

    await appStorage.setItem(key, nextItems);

    eventBus.emit(EventType.UpdateHistory);
  } catch (e) {
    console.error(e);
  }
}

export async function getItems() {
  return (await appStorage.getItem<string[]>(key)) || [];
}
