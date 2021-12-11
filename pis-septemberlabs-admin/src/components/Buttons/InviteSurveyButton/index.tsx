import React from 'react';

import './index.scss';

type Props = {
  onClick: () => void;
};

const CloseSurveyButton: React.FunctionComponent<Props> = ({onClick}: Props): JSX.Element => (
  <div>
    <button type="button" className="invite-survey-button" onClick={onClick}>
      <p className="invite-survey-button__label">Invite</p>
    </button>
  </div>
);

export default CloseSurveyButton;
