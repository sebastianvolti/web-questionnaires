import React from 'react';

import './index.scss';

type Props = {
  onClick: () => void;
};

const SurveyResultsButton: React.FunctionComponent<Props> = ({ onClick }: Props): JSX.Element => (
  <div>
    <button type="button" className="survey-results-button" onClick={onClick}>
      <p className="survey-results-button__label">Results</p>
    </button>
  </div>
);

export default SurveyResultsButton;
