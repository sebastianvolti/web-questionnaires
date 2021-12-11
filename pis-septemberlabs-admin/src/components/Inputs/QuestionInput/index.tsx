import React from 'react';

import './index.scss';

type Size = 'small' | 'large';

type Props = {
  defaultValue: string;
  onChange: (input: string) => void;
  size: Size;
};

const QuestionInput: React.FunctionComponent<Props> = ({
  defaultValue,
  onChange,
  size,
}: Props): JSX.Element => (
  <div className="question">
    <p className="subtitle">Write your question here</p>
    <textarea
      autoFocus
      className={`question__input question__input--${size}`}
      maxLength={100}
      defaultValue={defaultValue}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  </div>
);

export default QuestionInput;
