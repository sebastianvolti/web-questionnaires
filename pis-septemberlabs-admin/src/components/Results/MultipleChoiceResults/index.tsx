import React from 'react';
import ProgressBarResult from '../../ProgressBarResult';

import './index.scss';

type Props = {
  question: any;
};

const MultipleChoiceResults: React.FunctionComponent<Props> = ({ question }: Props): JSX.Element => (
  <div className="multiple-choice-results-container ">
    {question.parameters.options.map((option: string, index: number) => {
      const answerData = question.answerData[index];
      const progress = answerData / question.answersCount;
      let percentageProgress = progress * 100;

      if (Number.isNaN(percentageProgress)) {
        percentageProgress = 0;
      }

      return (
        <div className="multiple-choice-result">
          <div key={index} className="progress-bar-container">
            <ProgressBarResult label={option} progress={progress} />
          </div>
          <div className="progress-bar-description">{`${percentageProgress}% - ${answerData} Answers`}</div>
        </div>
      );
    })}
  </div>
);

export default MultipleChoiceResults;
