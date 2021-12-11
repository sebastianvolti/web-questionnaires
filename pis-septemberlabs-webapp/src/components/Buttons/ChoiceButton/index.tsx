import React from 'react';
import { connect } from 'react-redux';

import './index.scss';

type Props = {
  id: number;
  label: string;
  radioName: string;
  onTap: any;
  isSelected: boolean;
  isCheckbox: boolean;
};

const ChoiceButton: React.FunctionComponent<Props> = ({
  id,
  label,
  radioName,
  onTap,
  isSelected,
  isCheckbox,
}: Props): JSX.Element => (
  <div className="choice-button">
    <button
      id={String(id)}
      type="button"
      className={`choice-button__input ${
        isSelected ? 'choice-button--selected' : ''
      }`}
      name={radioName}
      onClick={() => onTap(id, label)}
    >
      <label htmlFor="dynamicInput" className="choice-button__label">
        <input
          type={isCheckbox === true ? 'checkbox' : 'radio'}
          id="dynamicInput"
          className={`choice-button__checkbox ${
            isSelected ? 'choice-button__checkbox--selected' : ''
          }`}
          checked={isSelected}
          onChange={() => {}}
        />
        {' '}
        <span className="choice-button__text">{label}</span>
      </label>
    </button>
  </div>
);

export default connect()(ChoiceButton);
