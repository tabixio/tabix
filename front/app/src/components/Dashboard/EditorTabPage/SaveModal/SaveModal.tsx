import React from 'react';
import { Modal, Input } from 'antd';
import { FieldChangeHandler } from 'module/mobx-utils';

interface Props {
  fieldName: string;
  fieldValue: string;
  onFieldChange: FieldChangeHandler<any>;
  onSave: () => void;
  onCancel: () => void;
}

export default function SaveModal({
  fieldName,
  fieldValue,
  onFieldChange,
  onSave,
  onCancel,
}: Props) {
  return (
    <Modal visible title="Save" onOk={onSave} onCancel={onCancel}>
      <Input
        autoFocus
        name={fieldName}
        value={fieldValue}
        onChange={onFieldChange}
        onPressEnter={onSave}
      />
    </Modal>
  );
}
