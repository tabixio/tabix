import { FieldType } from './constant';

type SwitcherItemWithoutChildren = Omit<SwitcherItem, 'children'>;

export interface SwitcherItem {
  id: string;
  displayName?: string;
  checked?: boolean;
  children?: SwitcherItemWithoutChildren[];
}

export interface SwitcherState {
  [FieldType.Rows]?: SwitcherItem[];
  [FieldType.Cols]?: SwitcherItem[];
  [FieldType.Values]?: SwitcherItem[];
}

export interface SwitcherFieldd {
  allowEmpty?: boolean;
  expandable?: boolean;
  expandText?: string;
  selectable?: boolean;
  items: SwitcherItem[] | undefined;
}

//

export interface SwitcherFields {
  [FieldType.Rows]?: SwitcherFieldd;
  [FieldType.Cols]?: SwitcherFieldd;
  [FieldType.Values]?: SwitcherFieldd;
}

export interface SwitcherResultItem {
  items: SwitcherItemWithoutChildren[];
  hideItems: SwitcherItemWithoutChildren[];
}

export interface SwitcherResult {
  [FieldType.Rows]: SwitcherResultItem;
  [FieldType.Cols]: SwitcherResultItem;
  [FieldType.Values]: SwitcherResultItem;
}
