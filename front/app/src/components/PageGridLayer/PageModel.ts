import { v4 as uuid } from 'uuid';
// import { GridLayout } from './PageGridLayout';

class PageSource {
  public id = '';
  public q = '';

  constructor(q: string, id = '') {
    this.q = q;
    this.id = id || uuid();
  }
}

class PageCard {
  public id = '';

  constructor(id = '') {
    this.id = id || uuid();
  }

  public getGridLayout(): any /*:GridLayout*/ {
    const initialSize = { width: 4, height: 4 };
    const minSize = initialSize; //visualization.minSize || DEFAULT_CARD_SIZE;

    return {
      i: String('_ID_' + Date.now()), //,dashcard.id),
      x: /* dashcard.col || */ 0,
      y: /* dashcard.row || */ 0,
      w: /* dashcard.sizeX || */ initialSize.width,
      h: /* dashcard.sizeY || */ initialSize.height,
      minW: minSize.width,
      minH: minSize.height,
      // card: this,
    };
  }
}

export enum INPUT_TYPE {
  string = 'STR',
  int = 'INT',
  date = 'DATE',
  dateTime = 'DATETIME',
  time = 'TIME',
  select = 'SELECT',
}
export interface _pageRow {
  title?: string;
  w?: number | string;
  h?: number | string;
}

class PageRow {
  public id = '';
  public title?: string;
  public w?: number | string;
  public h?: number | string;

  constructor(s: _pageRow, id = '') {
    this.id = id || uuid();
    this.w = s.w;
    this.h = s.h;
    this.title = s.title;
  }
}

class PageInput {
  private id = '';
  public title?: string;
  public name: string;
  public type: INPUT_TYPE;
  public row_id: string;

  constructor(s: _pageInput, row_id: string) {
    this.name = s.name;
    this.title = s.title;
    this.type = s.type;
    this.row_id = row_id;
  }
}

export interface _pageInput {
  title?: string;
  type: INPUT_TYPE;
  name: string;
}

export interface PageMeta {
  id?: string;
  edit?: boolean;
  title?: string;
}

export class PageModel {
  private id = '';
  private data: PageMeta = {
    edit: true,
  };
  private rows: Map<string, PageRow> = new Map<string, PageSource>();
  private cards: Map<string, PageCard> = new Map();
  private source: Map<string, PageSource> = new Map();

  constructor(data: PageMeta) {
    this.id = data.id || uuid();
    this.data = data;
  }
  public title(): string {
    return this.data.title;
  }
  public isEdit(): boolean {
    return this.data.edit;
  }
  public addSource(q: string): string {
    const i = new PageSource(q);
    this.source.set(i.id, i);
    return i.id;
  }
  public addInput(row_id: string, s: _pageInput): void {
    const i = new PageInput(s, row_id);
  }
  public addRow(s: _pageRow): string {
    const r = new PageRow(s);
    this.rows.set(r.id, r);
    return r.id;
  }

  public addRowGraph(
    row_id: string,
    // s: { source: string; title?: string; w?: number | string; h?: number | string },
    p: Array<{
      source: string;
      title?: string;
      type: string;
      edit: boolean;
      x: Array<string> | string;
      y: Array<string> | string;
      w?: number | string;
      h?: number | string;
    }>
  ): string {
    //
    // Create row and return id
    return uuid();
  }

  public addCard() {
    const card = new PageCard();
    this.cards.set(card.id, card);
  }
}
