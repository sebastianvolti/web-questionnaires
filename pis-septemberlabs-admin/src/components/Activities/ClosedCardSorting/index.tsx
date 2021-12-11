import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

import ActivityFactory from '../../../entities/ActivityFactory';
import Activity from '../../../entities/Activity';
import ClosedCardSortingEntity from '../../../entities/ClosedCardSorting';
import QuestionInput from '../../Inputs/QuestionInput';
import RequiredCheckbox from '../../Buttons/RequiredCheckbox';

type Props = {
  activity?: Activity;
};

const ClosedCardSorting: React.FunctionComponent<Props> = ({ activity }: Props): JSX.Element => {
  const [newCardContent, setNewCardContent] = useState('');
  const [reloadList, setReloadList] = useState(false);
  const [newGroupContent, setNewGroupContent] = useState('');
  const [isRequiredValue, setIsRequiredValue] = useState(false);

  if (activity === null) {
    activity = ActivityFactory.getActivity('closed-card-sorting') as Activity;
  }

  const closedCardSortingActivity = activity as ClosedCardSortingEntity;

  const setIsRequired = (required: boolean) => {
    closedCardSortingActivity.setIsRequired(required);
    setIsRequiredValue(required);
  };
  const handleClick = () => setIsRequired(!isRequiredValue);

  const addCardInActivity = (data: string) => closedCardSortingActivity?.addCard(data);
  const deleteCardInActivity = (index: number) => closedCardSortingActivity?.deleteCard(index);
  const addGroupInActivity = (data: string) => closedCardSortingActivity?.addGroup(data);
  const deleteGroupInActivity = (index: number) => closedCardSortingActivity?.deleteGroup(index);
  const changeQuestionInActivity = (newData: string) => closedCardSortingActivity
    ?.setQuestion(newData);

  const handleSubmitCard = (e: any) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      if (newCardContent) {
        addCardInActivity(newCardContent);
        setNewCardContent('');
      }
    }
  };

  const handleSubmitGroup = (e: any) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      if (newGroupContent) {
        addGroupInActivity(newGroupContent);
        setNewGroupContent('');
      }
    }
  }

  return (
    <div className="closed-content">
      <div className="question-input">
        <QuestionInput
          defaultValue={closedCardSortingActivity?.getQuestion()}
          onChange={changeQuestionInActivity}
          size="small"
        />
      </div>
      <div className="closed-content__cards">
        <p className="closed-content__subtitle">Cards</p>
        <div className="closed-content__cards__list">
          {closedCardSortingActivity?.getCard() !== []
              && closedCardSortingActivity?.getCard().map((option: string, index: number) => (
                <div key={index.toString()}>
                  <div className="closed-content__cards__list__card">
                    <span className="closed-content__text">{option}</span>
                    <div className="closed-content__cards__list__cross">
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
        <div className="closed-content__cards__new-card">
          <input
            className="closed-content__cards__new-card__input"
            maxLength={100}
            placeholder="Type to add a card"
            value={newCardContent}
            onKeyDown={handleSubmitCard}
            onChange={(event) => setNewCardContent(event.target.value)}
          />
        </div>
      </div>

      <div className="closed-content__groups">
        <p className="closed-content__subtitle">Groups</p>
        <div className="closed-content__groups__list">
          {closedCardSortingActivity?.getGroup() !== []
            && closedCardSortingActivity?.getGroup().map((option: string, index: number) => (
              <div key={index.toString()}>
                <div className="closed-content__groups__list__group">
                  <span className="closed-content__text">{option}</span>
                  <div className="closed-content__groups__list__cross">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => {
                        deleteGroupInActivity(index);
                        setReloadList(!reloadList);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="closed-content__groups__new-group">
          <input
            className="closed-content__groups__new-group__input"
            maxLength={100}
            placeholder="Type to add a group"
            value={newGroupContent}
            onKeyDown={handleSubmitGroup}
            onChange={(event) => setNewGroupContent(event.target.value)}
          />
        </div>
      </div>
      <RequiredCheckbox
        isRequired={closedCardSortingActivity.getIsRequired()}
        onClick={handleClick}
      />
    </div>
  );
};

export default ClosedCardSorting;
