import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { isEqual } from 'lodash';
import cx from 'classnames';
import React from 'react';
import { BeforeCapture, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { FieldType, SWITCHER_CONFIG, SWITCHER_FIELDS } from '../constant';
import { Dimension } from '../dimension';
import { SwitcherFields, SwitcherResult, SwitcherState } from '../interfaces';
import {
  checkItem,
  generateSwitchResult,
  getMainLayoutClassName,
  getSwitcherClassName,
  getSwitcherState,
  moveItem,
  shouldCrossRows,
} from '../util';
import { SheetType } from '@antv/s2-react';

const CLASS_NAME_PREFIX = 'contents';

export interface SwitcherContentRef {
  getResult: () => SwitcherResult;
}

export interface SwitcherContentProps extends SwitcherFields {
  currentSheetType: string;
  sheetType?: SheetType;
  contentTitleText?: string;
  resetText?: string;
  innerContentClassName?: string;
  onToggleVisible: () => void;
  onSubmit?: (result: SwitcherResult) => void;
}

export const SwitcherContent: React.FC<SwitcherContentProps> = ({
  currentSheetType,
  innerContentClassName,
  contentTitleText,
  resetText,
  onToggleVisible,
  onSubmit,
  sheetType,
  ...defaultFields
}) => {
  const defaultState = getSwitcherState(defaultFields);

  const [state, setState] = React.useState<SwitcherState>(defaultState);
  const [draggingItemId, setDraggingItemId] = React.useState<string | null>(null);

  const onBeforeDragStart = (initial: BeforeCapture) => {
    setDraggingItemId(initial.draggableId);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // reset dragging item id
    setDraggingItemId(null);

    // cancelled or drop to where can't drop
    if (!destination) {
      return;
    }
    // don't change position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const updatedState = moveItem(
      state[source.droppableId],
      state[destination.droppableId],
      source,
      destination
    );
    setState({ ...state, ...updatedState });
  };

  const onReset = () => {
    setState(defaultState);
  };

  const onConfirm = () => {
    onToggleVisible();
    onSubmit?.(generateSwitchResult(state));
  };

  const onVisibleItemChange = (
    fieldType: FieldType,
    checked: boolean,
    id: string,
    parentId?: string
  ) => {
    const updatedState = checkItem(state[fieldType], checked, id, parentId);
    setState({
      ...state,
      [fieldType]: updatedState,
    });
  };

  const isNothingChanged = isEqual(defaultState, state);

  const displayFieldItems = SWITCHER_FIELDS.filter(
    (filed) => sheetType !== 'table' || filed === FieldType.Cols
  );
  console.log('SwitcherContent -> render -> ', sheetType, currentSheetType);
  return (
    <DragDropContext onBeforeCapture={onBeforeDragStart} onDragEnd={onDragEnd}>
      <div className={cx(innerContentClassName, getSwitcherClassName(CLASS_NAME_PREFIX))}>
        <header className={getSwitcherClassName(CLASS_NAME_PREFIX, 'header')}>
          {contentTitleText}
        </header>
        <main
          className={cx(
            getSwitcherClassName(CLASS_NAME_PREFIX, 'main'),
            getMainLayoutClassName(sheetType)
          )}
        >
          {displayFieldItems.map((type) => {
            const c = state[type];
            // if (c === undefined) return;
            return (
              <Dimension
                {...defaultFields[type]}
                key={type}
                fieldType={type}
                items={c}
                crossRows={shouldCrossRows(sheetType, type)}
                droppableType={SWITCHER_CONFIG[type].droppableType}
                draggingItemId={draggingItemId ?? null}
                onVisibleItemChange={onVisibleItemChange}
              />
            );
          })}
        </main>
        <footer className={getSwitcherClassName(CLASS_NAME_PREFIX, 'footer')}>
          <Button icon={<ReloadOutlined />} disabled={isNothingChanged} onClick={onReset}>
            Reset
          </Button>

          <Button className="action-button" onClick={onToggleVisible}>
            Cancel
          </Button>
          <Button
            className="action-button"
            type="primary"
            disabled={isNothingChanged}
            onClick={onConfirm}
          >
            Ok
          </Button>
        </footer>
      </div>
    </DragDropContext>
  );
};

SwitcherContent.displayName = 'SwitcherContent';

SwitcherContent.defaultProps = {
  sheetType: 'pivot',
  contentTitleText: 'Switch Dimensions',
  resetText: 'Restore default',
};
