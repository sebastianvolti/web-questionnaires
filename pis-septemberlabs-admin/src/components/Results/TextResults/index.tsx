import React from 'react';

import './index.scss';

import TextResultItem from './TextResultItem';

type Props = {
  question: any;
};

const TextResults: React.FunctionComponent<Props> = ({ question }: Props): JSX.Element => (
  <div className="text-results-container">
    <div className="text-results-answers">
      {question.answerData.results.map((answer: string, index: number) => (
        <div className="text-result-item-container" key={index}>
          <TextResultItem content={answer} />
        </div>
      ))}
    </div>
  </div>
);

export default TextResults;
