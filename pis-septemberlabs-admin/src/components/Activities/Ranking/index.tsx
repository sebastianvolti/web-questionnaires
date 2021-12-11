import React, { useState } from 'react';

import './index.scss';

import ActivityFactory from '../../../entities/ActivityFactory';
import Activity from '../../../entities/Activity';
import RankingEntity from '../../../entities/Ranking';
import QuestionInput from '../../Inputs/QuestionInput';
import RequiredCheckbox from '../../Buttons/RequiredCheckbox';

type Props = {
  activity?: Activity;
};

const Ranking: React.FunctionComponent<Props> = ({ activity }: Props): JSX.Element => {
  if (activity === null) {
    activity = ActivityFactory.getActivity('ranking') as Activity;
  }

  const rankingActivity = activity as RankingEntity;

  const handleQuestionTitleChange = (newTitle: string) => rankingActivity.setQuestion(newTitle);

  const [isRequiredValue, setIsRequiredValue] = useState(false);

  const setIsRequired = (required: boolean) => {
    rankingActivity.setIsRequired(required);
    setIsRequiredValue(required);
  };

  const handleClick = () => setIsRequired(!isRequiredValue);

  return (
    <div className="content">
      <QuestionInput
        defaultValue={rankingActivity.getQuestion()}
        onChange={handleQuestionTitleChange}
        size="large"
      />
      <RequiredCheckbox isRequired={rankingActivity.getIsRequired()} onClick={handleClick} />
    </div>
  );
};

export default Ranking;
