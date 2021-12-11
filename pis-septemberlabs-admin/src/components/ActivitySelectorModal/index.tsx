import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CircledButton from '../Buttons/CircledButton';
import ActivityBlock from '../ActivityBlock';

import SingleChoice from '../../entities/SingleChoice';
import MultipleChoice from '../../entities/MultipleChoice';
import Activity from '../../entities/Activity';
import ActivityFactory from '../../entities/ActivityFactory';
import OpenCardSorting from '../../entities/OpenCardSorting';
import ClosedCardSorting from '../../entities/ClosedCardSorting';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  currentActivity?: Activity;
  saveActivity: (activity: Activity) => void;
  resetActivity: () => void;
  resetActivityIndex: () => void;
};

const ActivitySelectorModal: React.FunctionComponent<Props> = ({
  isOpen,
  onRequestClose,
  currentActivity,
  saveActivity,
  resetActivity,
  resetActivityIndex,
}: Props): JSX.Element => {
  const [newActivity, setNewActivity] = useState<Activity | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const initialActivity = newActivity ? newActivity.getType() : '';
  const initialStep = newActivity ? 2 : 1;

  const [selectedActivity, setSelectedActivity] = useState(initialActivity);
  // step 1 = activity type selection, step 2 = activity configuration
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    if (currentActivity !== undefined) {
      setIsEditing(true);
      const clonedActivity: Activity = currentActivity.clone();
      setNewActivity(clonedActivity);
      setStep(2);
      setSelectedActivity(clonedActivity.getType());
    }
  }, [currentActivity]);

  const onActivityClick = (activityType: string) => {
    setSelectedActivity(activityType);
  };

  const handleRequestClose = () => {
    setIsEditing(false);
    setStep(1);
    setNewActivity(undefined);
    onRequestClose();
    setSelectedActivity('');
    resetActivity();
    resetActivityIndex();
  };

  const handlePrimaryClick = () => {
    if (step === 1 && selectedActivity) {
      setStep(2);
    } else if (step === 2) {
      const activityType = newActivity?.getType();

      switch (activityType) {
      case 'single-choice':
        const simpleChoiceActivity = newActivity as SingleChoice;
        const simpleAnswers = simpleChoiceActivity?.getAnswer();

        if (!simpleChoiceActivity?.getQuestion()) {
          alert('You cannot save an empty activity.'); // eslint-disable-line
        } else if (!simpleAnswers || simpleAnswers.length === 0) {
          alert('Your activity does not have any options.'); // eslint-disable-line
        } else {
          setIsEditing(false);
          saveActivity(simpleChoiceActivity);
          handleRequestClose();
        }
        break;
      case 'multiple-choice':
        const multipleChoiceActivity = newActivity as MultipleChoice;
        const multAnswers = multipleChoiceActivity?.getAnswer();

        if (!multipleChoiceActivity?.getQuestion()) {
          alert('You cannot save an empty activity.'); // eslint-disable-line
        } else if (!multAnswers || multAnswers.length === 0) {
          alert('Your activity does not have any options.'); // eslint-disable-line
        } else {
          setIsEditing(false);
          saveActivity(multipleChoiceActivity);
          handleRequestClose();
        }
        break;
      case 'open-card-sorting':
        const openCardSortingActivity = newActivity as OpenCardSorting;
        const openCards = openCardSortingActivity?.getCard();

        if (!openCardSortingActivity?.getQuestion()) {
          alert('You cannot save an empty activity.'); // eslint-disable-line
        } else if (!openCards || openCards.length === 0) {
          alert('Your activity does not have any cards.'); // eslint-disable-line
        } else {
          setIsEditing(false);
          saveActivity(openCardSortingActivity);
          handleRequestClose();
        }
        break;
      case 'closed-card-sorting':
        const closedCardSortingActivity = newActivity as ClosedCardSorting;
        const closedCards = closedCardSortingActivity?.getCard();
        const closedGroups = closedCardSortingActivity?.getGroup();

        if (!closedCardSortingActivity?.getQuestion()) {
          alert('You cannot save an empty activity.'); // eslint-disable-line
        } else if (!closedCards || closedCards.length === 0) {
          alert('Your activity does not have any cards.'); // eslint-disable-line
        } else if (!closedGroups || closedGroups.length === 0) {
          alert('Your activity does not have any groups.'); // eslint-disable-line
        } else {
          setIsEditing(false);
          saveActivity(closedCardSortingActivity);
          handleRequestClose();
        }
        break;
      default:
        if (newActivity?.getQuestion()) {
          setIsEditing(false);
          saveActivity(newActivity);
          handleRequestClose();
        } else {
          console.error('Trying to save undefined activity'); // eslint-disable-line
          alert('You cannot save an empty activity.'); // eslint-disable-line
        }
        break;
      }
    }
  };

  const handleCancelClick = () => {
    if (step === 1) {
      handleRequestClose();
    } else if (isEditing) {
      handleRequestClose();
    } else {
      setStep(1);
      setNewActivity(undefined);
      setSelectedActivity('');
      resetActivity();
    }
  };

  const renderStep1 = (): JSX.Element => (
    <>
      <div className="activity-modal__questions activity-modal__questions--first-row">
        <ActivityBlock
          activityType="single-choice"
          isSelected={selectedActivity === 'single-choice'}
          onClick={onActivityClick}
        />
        <ActivityBlock
          activityType="multiple-choice"
          isSelected={selectedActivity === 'multiple-choice'}
          onClick={onActivityClick}
        />
      </div>
      <div className="activity-modal__questions">
        <ActivityBlock
          activityType="ranking"
          isSelected={selectedActivity === 'ranking'}
          onClick={onActivityClick}
        />
        <ActivityBlock
          activityType="text"
          isSelected={selectedActivity === 'text'}
          onClick={onActivityClick}
        />
      </div>
      <div className="activity-modal__questions activity-modal__questions--third-row">
        <ActivityBlock
          activityType="open-card-sorting"
          isSelected={selectedActivity === 'open-card-sorting'}
          onClick={onActivityClick}
        />
        <ActivityBlock
          activityType="closed-card-sorting"
          isSelected={selectedActivity === 'closed-card-sorting'}
          onClick={onActivityClick}
        />
      </div>
    </>
  );

  const renderStep2 = () => {
    if (!newActivity) {
      setNewActivity(ActivityFactory.getActivity(selectedActivity));
      return null;
    }

    return newActivity.getComponent(newActivity);
  };

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={handleRequestClose} className="activity-modal">
      <div className="activity-modal__header">
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="2x"
          color="#cccccc"
          onClick={handleRequestClose}
          className="activity-modal__times"
        />
      </div>
      <div className="activity-modal__title">
        {step === 1 ? 'New Question' : ActivityFactory.getActivity(selectedActivity).getTitle()}
      </div>

      {step === 1 ? renderStep1() : renderStep2()}

      <div className="activity-modal__footer">
        <CircledButton name="Cancel" primary={false} onClick={handleCancelClick} />
        <CircledButton name={step === 1 ? 'Next' : 'Save'} primary onClick={handlePrimaryClick} />
      </div>
    </Modal>
  );
};

export default ActivitySelectorModal;
