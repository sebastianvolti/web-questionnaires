import React from 'react';

import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';

type Props = {
  index: number;
  title: string;
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
};

const ActivityItem: React.FunctionComponent<Props> = ({
  index,
  title,
  handleDelete,
  handleEdit,
}: Props): JSX.Element => (
  <div className="activity-item">
    <div className="activity-item__index">{index + 1}</div>
    <div className="activity-item__block">
      <div className="activity-item__block__title">
        {title}
      </div>
      <div className="activity-item__block__edit">
        <EditIcon onClick={() => handleEdit(index)} />
      </div>
    </div>

    <div className="activity-item__delete" onClick={() => handleDelete(index)}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  </div>
);

export default ActivityItem;
