import React from 'react';

import './index.scss';

import TextArea from '../inputs/TextArea';

type Props = {
  label: string;
  answer: any;
  setAnswer(value: string): void;
  validate(isValid: boolean): void;
};

const TextQuestion: React.FunctionComponent<Props> = ({
  label,
  answer,
  setAnswer,
  validate,
}: Props): JSX.Element => (
  <div className="App">
    <h1 className="App__title">{label}</h1>
    <div className="App__containers">
      <TextArea
        value={answer || ''}
        onChange={(input: string) => {
          setAnswer(input);
          validate(input !== '');
        }}
      />
    </div>
  </div>
);

export default TextQuestion;
