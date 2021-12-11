import React from 'react';

import './index.scss';

type Props = {
  onClick: () => void;
};

const CloseSurveyButton: React.FunctionComponent<Props> = ({onClick}: Props): JSX.Element => (
  <div>
    <button type="button" className="close-survey-button" onClick={onClick}>
      <p className="close-survey-button__label">Close Survey</p>
    </button>
  </div>
);

export default CloseSurveyButton;
