import React, { useState, useContext } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import EditIcon from '@material-ui/icons/Edit';
import { LabelContext } from '../../../contexts/LabelContext';
import { modalStyle, buttonStyle } from './EditColumnModal.module.scss';
import { useMutation } from 'urql';
import CreateLabel from '../CreateLabel/index';
import LabelList from '../LabelList/index';
import { UPDATE_COLUMN } from '../../Project/Queries/index';

const EditColumnModal = ({ column }) => {
  const [updateColumn, setUpdateColumn] = useState({ name: column.name });
  const [open, setOpen] = useState(false);
  const [, executeMutation] = useMutation(UPDATE_COLUMN);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const toggle = () => {
    handleClose();
    setUpdateColumn({ id: '', color: '', name: '' });
  };
  const handleChanges = e => {
    e.preventDefault();
    setUpdateColumn({
      ...updateColumn,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      open={open}
      onClose={toggle}
      trigger={
        <p onClick={handleOpen}>
          {' '}
          {column.name} <EditIcon />
        </p>
      }
      className={modalStyle}
    >
      <Modal.Header>Edit Column</Modal.Header>
      <Modal.Content>
        <input name="name" value={updateColumn.name} onChange={handleChanges} />
        <Modal.Description>
          <LabelList column={column} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className={buttonStyle}>
        <Button className="ui cancel button" onClick={toggle}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default EditColumnModal;