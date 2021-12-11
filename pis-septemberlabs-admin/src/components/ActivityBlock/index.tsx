import React from 'react';

import Activity from '../../entities/Activity';
import ActivityFactory from '../../entities/ActivityFactory';

import './index.scss';

type Props = {
  activityType: string;
  isSelected: boolean;
  onClick: (activityType: string) => void;
};

const ActivityBlock: React.FunctionComponent<Props> = ({
  activityType,
  isSelected,
  onClick,
}: Props): JSX.Element => {
  const activity: Activity = ActivityFactory.getActivity(activityType);

  return (
    <div
      className={`activity-block ${isSelected ? 'activity-block__selected' : ''}`}
      onClick={() => onClick(activityType)}
    >
      <div
        className={`activity-block__question-img ${activityType === 'open-card-sorting' || activityType === 'closed-card-sorting'
          ? 'activity-block__question-img--card-sorting' : ''}`}
      >
        {activity.getSvgIcon()}
      </div>
      <div className="activity-block__question-name">{activity.getTitle()}</div>
    </div>
  );
};

export default ActivityBlock;
