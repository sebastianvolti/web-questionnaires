import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import Activity from '../../../entities/Activity';
import SingleChoice from '../../../entities/SingleChoice';
import QuestionInput from '../../Inputs/QuestionInput';
import RequiredCheckbox from '../../Buttons/RequiredCheckbox';

type Props = {
  activity?: Activity;
};

const SingleChoiceActivity: React.FunctionComponent<Props> = ({ activity }: Props): JSX.Element => {
  const simpleChoiceActivity = activity as SingleChoice;
  const [newAnswer, setAddAnswerState] = useState(false);
  const [isRequiredValue, setIsRequiredValue] = useState(false);
  const [reloadList, setReloadListState] = useState(false);
  const [newQuestionContent, setNewQuestionContentState] = useState('');

  const changeQuestionInActivity = (newData: string) => simpleChoiceActivity?.setQuestion(newData);
  const deleteAnswerInActivity = (index: number) => simpleChoiceActivity?.deleteAnswer(index);
  const addAnswerInActivity = (answer: string) => simpleChoiceActivity?.addAnswer(answer);
  const setIsRequiredInActivity = (required: boolean) => simpleChoiceActivity?.setIsRequired(required);

  const handleKeyDown = (event:any) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      if (newQuestionContent !== '') {
        addAnswerInActivity(newQuestionContent);
        setNewQuestionContentState('');
        setAddAnswerState(false);
      }
    }
  };

  return (
    <div className="content">
      <QuestionInput
        defaultValue={simpleChoiceActivity?.getQuestion()}
        onChange={changeQuestionInActivity}
        size="small"
      />
      <div className="content__answers">
        <p className="content__subtitle">Answers</p>
        <div
          className={`content__answers__list ${
            newAnswer ? '' : 'content__answers__list__extended'
          }`}
        >
          {simpleChoiceActivity?.getAnswer() !== []
            && simpleChoiceActivity?.getAnswer().map((option: string, index: number) => (
              <div key={index.toString()}>
                <div className="content__answers__list__answer">
                  <span className="content__text">{option}</span>
                  <div className="content__answers__list__cross">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => {
                        deleteAnswerInActivity(index);
                        setReloadListState(!reloadList);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className={`content__add-button ${newAnswer ? 'content__add-button__selected' : ''}`}
        onClick={() => {
          setAddAnswerState(!newAnswer);
          setNewQuestionContentState('');
        }}
      >
        {newAnswer ? (
          <span>Cancel</span>
        ) : (
          <>
            <FontAwesomeIcon icon={faPlus} size="xs" />
            <span>&nbsp;Add Answer</span>
          </>
        )}
      </div>
      {newAnswer === true && (
        <div className="content__new-answer">
          <textarea
            autoFocus
            className="content__new-answer__input"
            maxLength={100}
            rows={1}
            onKeyDown={handleKeyDown}
            onChange={(event) => setNewQuestionContentState(event.target.value)}
          />
          <div className="content__new-answer__cross">
            <FontAwesomeIcon
              icon={faCheckSquare}
              onClick={() => {
                if (newQuestionContent !== '') {
                  addAnswerInActivity(newQuestionContent);
                  setNewQuestionContentState('');
                  setAddAnswerState(false);
                }
              }}
            />
          </div>
        </div>
      )}
      <RequiredCheckbox
        isRequired={simpleChoiceActivity.getIsRequired()}
        onClick={() => {
          setIsRequiredInActivity(!isRequiredValue);
          setIsRequiredValue(!isRequiredValue);
        }}
      />
    </div>
  );
};

export default SingleChoiceActivity;
