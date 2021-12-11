import React from 'react';

import './index.scss';
import ChoiceButton from '../../components/Buttons/ChoiceButton';

type Props = {
  label: string;
  options: string[];
  answer: any;
  setAnswer(value: number): void;
  validate(isValid: boolean): void;
};

const SimpleChoice: React.FunctionComponent<Props> = ({
  label,
  options,
  answer = -1,
  setAnswer,
  validate,
}: Props): JSX.Element => (
  <div className="simple-choice">
    <h1 className="simple-choice__header">{label}</h1>
    <div className="simple-choice__buttons">
      {options.map((option, index) => (
        <ChoiceButton
          key={option}
          radioName={label}
          id={index}
          label={option}
          onTap={(buttonId: number) => {
            const value = buttonId === answer ? -1 : buttonId;
            setAnswer(value);
            validate(value !== -1);
          }}
          isSelected={answer === index}
          isCheckbox={false}
        />
      ))}
    </div>
  </div>
);

export default SimpleChoice;
