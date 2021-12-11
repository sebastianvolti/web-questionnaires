import React, { useState } from 'react';

import './index.scss';

import ActivityFactory from '../../../entities/ActivityFactory';
import Activity from '../../../entities/Activity';
import TextAnswerEntity from '../../../entities/TextAnswer';
import QuestionInput from '../../Inputs/QuestionInput';
import RequiredCheckbox from '../../Buttons/RequiredCheckbox';

type Props = {
  activity?: Activity;
};

const TextAnswer: React.FunctionComponent<Props> = ({ activity }: Props): JSX.Element => {
  if (!activity) {
    activity = ActivityFactory.getActivity('text') as Activity;
  }

  const textActivity = activity as TextAnswerEntity;
  const handleQuestionTitleChange = (newTitle: string) => textActivity.setQuestion(newTitle);
  const [isRequiredValue, setIsRequiredValue] = useState(false);
  const setIsRequired = (required: boolean) => {
    textActivity.setIsRequired(required);
    setIsRequiredValue(required);
  };
  const handleClick = () => setIsRequired(!isRequiredValue);

  return (
    <div className="content">
      <QuestionInput
        defaultValue={textActivity.getQuestion()}
        onChange={handleQuestionTitleChange}
        size="large"
      />
      <RequiredCheckbox
        isRequired={textActivity.getIsRequired()}
        onClick={handleClick}
      />
    </div>
  );
};

export default TextAnswer;
