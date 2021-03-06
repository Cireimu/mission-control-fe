import React from 'react';
import {
  toggleCont,
  toggle,
  toggled,
  hiddenTog,
  toggledCont,
  hiddenTogCont,
  hiddenDisToggle,
  disToggle,
  editColumnsDiv,
  itemsContainer,
  deleteIcon,
} from './EditColumns.module.scss';
import { useMutation } from 'urql';
import { UPDATE_STATUS_DISPLAY as updateDisplay } from '../../Project/Queries/index';
import { FaExclamationCircle } from 'react-icons/fa';
import { Popup } from 'semantic-ui-react';

import DeleteColumn from '../DeleteColumn';
import EditColumnModal from '../EditColumnModal/index';

const EditColumns = ({ column, id, statuses }) => {
  const [, executeUpdateDisplay] = useMutation(updateDisplay);

  let displayFiltered = statuses.filter(function(e) {
    return e.display === true;
  });

  const disabledTer = displayFiltered.length >= 4 && !column.display;

  const toggler = e => {
    e.preventDefault();
    return disabledTer
      ? null
      : executeUpdateDisplay({ id, display: !column.display });
  };

  return (
    <div className={editColumnsDiv}>
      <div className={itemsContainer}>
        {/* #form-management */}
        {/* once the max number of enabled columns is reached, you will be told that you have to disable another before you can enable more, it also disables the toggle buttons
        and grays it out, uses the length of the array containing enabled columns to determin whether or not to disable it*/}
        <Popup
          content="The maximum amount of columns have been displayed. Toggle off another column to toggle this one on."
          trigger={
            <FaExclamationCircle
              className={disabledTer ? disToggle : hiddenDisToggle}
            />
          }
        />
        <div
          onClick={toggler}
          className={
            disabledTer
              ? hiddenTogCont
              : column.display
              ? toggledCont
              : toggleCont
          }
        >
          <div
            className={
              disabledTer ? hiddenTog : column.display ? toggled : toggle
            }
          />
        </div>
        <div>{column.name}</div>
      </div>
      <div className={itemsContainer}>
        <div>
          <EditColumnModal column={column} />
        </div>
        <div className={deleteIcon}>
          <DeleteColumn column={column} />
        </div>
      </div>
    </div>
  );
};

export default EditColumns;
