import appStorage from './appStorage';

const key = 'sqlHistory';
const maxItems = 30;

export async function addItems(sql: ReadonlyArray<string>) {
  const items = await getItems();
  const uniqueItems: string[] = [];

  if (items.length) {
    const fromIndex = items.length - sql.length;
    sql.forEach(item => {
      if (!items.includes(item, fromIndex)) {
        uniqueItems.push(item);
      }
    });
  }

  const offset = items.length + uniqueItems.length - maxItems;
  const nextItems =
    offset > 0 ? items.concat(...uniqueItems).slice(offset) : items.concat(...uniqueItems);

  await appStorage.setItem(key, nextItems);
  return nextItems;
}

export async function getItems() {
  return appStorage.getItem<string[]>(key);
}
