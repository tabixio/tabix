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

export interface SwitcherField {
  allowEmpty?: boolean;
  expandable?: boolean;
  expandText?: string;
  selectable?: boolean;
  items: SwitcherItem[];
}

//

export interface SwitcherFields {
  [FieldType.Rows]?: SwitcherField;
  [FieldType.Cols]?: SwitcherField;
  [FieldType.Values]?: SwitcherField;
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
