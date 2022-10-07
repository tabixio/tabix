import { ColIcon, RowIcon, ValueIcon } from '../Sort/Icons';

export const SWITCHER_PREFIX_CLS = 'switcher';

export enum FieldType {
  Rows = 'rows',
  Cols = 'columns',
  Values = 'values',
}

export enum DroppableType {
  Dimension = 'dimension',
  Measure = 'measure',
}

export const SWITCHER_FIELDS = [FieldType.Rows, FieldType.Cols, FieldType.Values];

export const SWITCHER_CONFIG = {
  [FieldType.Rows]: {
    text: 'Rows',
    icon: RowIcon,
    droppableType: DroppableType.Dimension,
  },
  [FieldType.Cols]: {
    text: 'Cols',
    icon: ColIcon,
    droppableType: DroppableType.Dimension,
  },
  [FieldType.Values]: {
    text: 'Values',
    icon: ValueIcon,
    droppableType: DroppableType.Measure,
  },
} as const;
