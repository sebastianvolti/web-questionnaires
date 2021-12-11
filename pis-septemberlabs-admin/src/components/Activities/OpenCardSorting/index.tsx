import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

import ActivityFactory from '../../../entities/ActivityFactory';
import Activity from '../../../entities/Activity';
import OpenCardSortingEntity from '../../../entities/OpenCardSorting';
import QuestionInput from '../../Inputs/QuestionInput';
import RequiredCheckbox from '../../Buttons/RequiredCheckbox';

type Props = {
  activity?: Activity;
};

const OpenCardSorting: React.FunctionComponent<Props> = ({ activity }: Props): JSX.Element => {
  const [newCardContent, setNewCardContent] = useState('');
  const [reloadList, setReloadList] = useState(false);

  if (activity === null) {
    activity = ActivityFactory.getActivity('open-card-sorting') as Activity;
  }

  const handleSubmit = (e: any) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      if (newCardContent) {
        addCardInActivity(newCardContent);
        setNewCardContent('');
      }
    }
  };

  const openCardSortingActivity = activity as OpenCardSortingEntity;

  const [isRequiredValue, setIsRequiredValue] = useState(false);

  const handleClick = () => setIsRequired(!isRequiredValue);
  const setIsRequired = (required: boolean) => {
    openCardSortingActivity.setIsRequired(required);
    setIsRequiredValue(required);
  };

  const addCardInActivity = (data: string) => openCardSortingActivity?.addCard(data);
  const deleteCardInActivity = (index: number) => openCardSortingActivity?.deleteCard(index);
  const changeQuestionInActivity = (newData: string) => openCardSortingActivity?.setQuestion(newData);

  return (
    <div className="content">
      <QuestionInput
        defaultValue={openCardSortingActivity?.getQuestion()}
        onChange={changeQuestionInActivity}
        size="small"
      />
      <div className="content__cards">
        <p className="content__subtitle">Cards</p>
        <div className="content__cards__list">
          {openCardSortingActivity?.getCard() !== []
            && openCardSortingActivity?.getCard().map((option: string, index: number) => (
              <div key={index.toString()}>
                <div className="content__cards__list__card">
                  <span className="content__text">{option}</span>
                  <div className="content__cards__list__cross">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => {
                        deleteCardInActivity(index);
                        setReloadList(!reloadList);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="content__new-card">
          <input
            className="content__new-card__input"
            maxLength={100}
            placeholder="Type to add a card"
            value={newCardContent}
            onKeyDown={handleSubmit}
            onChange={(event) => setNewCardContent(event.target.value)}
          />
        </div>
      </div>
      <RequiredCheckbox
        isRequired={openCardSortingActivity.getIsRequired()}
        onClick={handleClick}
      />
    </div>
  );
};

export default OpenCardSorting;
