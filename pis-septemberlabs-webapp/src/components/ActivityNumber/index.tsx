import * as React from 'react';

import './index.scss';

type Props = {
  activityNumber: number,
}

const ActivityNumber: React.FunctionComponent<Props> = ({ activityNumber }: Props): JSX.Element => (
  <div className="activity-number">
    <div className="activity-number__rectangle" />
    <div className="activity-number__circle">
      {activityNumber}
    </div>
  </div>
);

export default ActivityNumber;
