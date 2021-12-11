import React from 'react';

import './index.scss';
import ChoiceButton from '../../components/Buttons/ChoiceButton';

type Props = {
  label: string;
  options: string[];
  answer: any;
  setAnswer(value: any): void;
  validate(isValid: boolean): void;
  minimumOptions: number | undefined
};

const MultipleChoice: React.FunctionComponent<Props> = ({
  label,
  options,
  answer: optionsSelected,
  setAnswer: setOptionsSelected,
  validate,
  minimumOptions = 1,
}: Props): JSX.Element => (
  <div className="multiple-choice">
    <h1 className="multiple-choice__header">{label}</h1>
    <div className="multiple-choice__buttons">
      {options.map((option, index) => (
        <ChoiceButton
          key={option}
          radioName={label}
          id={index}
          label={option}
          onTap={() => {
            const selected = optionsSelected || options.map(() => false);
            const value = [
              ...selected.slice(0, index),
              !selected[index],
              ...selected.slice(index + 1),
            ];

            setOptionsSelected([...value]);
            // setAnswer([...value]);
            validate(
              value?.includes(true)
              && value?.reduce((a, isSelected) => (isSelected ? a + 1 : a), 0) >= minimumOptions
            );
          }}
          isSelected={optionsSelected && optionsSelected[index]}
          isCheckbox
        />
      ))}
    </div>
  </div>
);

export default MultipleChoice;
