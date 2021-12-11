import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ActivityNumber from '../../components/ActivityNumber';
import Arrow from '../../components/Buttons/Arrow';

import {
  Questionnaire as QuestionnaireData,
  Activity,
  AnswerData,
} from '../../helpers/constants/types';
import SimpleChoice from '../../components/SimpleChoice';
import MultipleChoice from '../../components/MultipleChoice';
import TextQuestion from '../../components/TextQuestion';
import RankingActivity from '../../components/RankingActivity';
import ClosedCardSorting from '../../components/CardSorting/ClosedCardSorting';
import OpenCardSorting from '../../components/CardSorting/OpenCardSorting';

import * as questionnaireActions from '../../redux/actions/questionnaireActions';

import './index.scss';

type Props = {
  surveyId: string;
  userData: any;
  questionnaire: QuestionnaireData;
  getQuestionnaire(surveyId: string): any;
  setAnswer(index: number, answer: AnswerData): void;
  finishQuestionnaire(surveyId: string, participationId: number): any;
};

const Questionnaire: React.FunctionComponent<Props> = ({
  surveyId,
  userData,
  questionnaire,
  getQuestionnaire,
  setAnswer: setParsedAnswer,
  finishQuestionnaire,
}: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [actualActivity, setActualActivity] = useState<Activity | null>(null);
  const [answer, setAnswer] = useState<any>(null);
  const [savingState, setSavingState] = useState(false);
  const [valid, setValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // user.data undefined after userLogout method
    if (userData && Object.keys(userData).length && !userData.data) {
      history.replace(`/login/${surveyId}`);
    }
  });

  useEffect(() => {
    // API Endpoint to get Questionnaire
    getQuestionnaire(surveyId);
  }, [getQuestionnaire]);

  const getAnswerFromParsedAnswer: {
    [key: number]: (activity: Activity) => any;
  } = {
    1: (multipleChoice) => {
      if (multipleChoice.answers) {
        const { selected } = multipleChoice.answers[0].answer;
        if (selected && multipleChoice.parameters.options) {
          return multipleChoice.parameters.options.map((option, index) => selected.includes(index));
        }
      }
      return undefined;
    },
    2: (simpleChoice) => (
      simpleChoice.answers ? (simpleChoice.answers[0].answer.selected || [])[0] : undefined
    ),
    3: (text) => (text.answers ? text.answers[0].answer.text : undefined),
    4: (ranking) => (ranking.answers ? ranking.answers[0].answer.rank : undefined),
    5: (closedCardSorting) => (closedCardSorting.answers
      ? { ...closedCardSorting.answers[0].answer, ...{ banner: [] } }
      : undefined),
    6: (openCardSorting) => (openCardSorting.answers
      ? { ...openCardSorting.answers[0].answer, ...{ 0: { title: 'Banner', cards: [] } } }
      : undefined),
  };

  useEffect(() => {
    if (!savingState && questionnaire && questionnaire.success && questionnaire.data) {
      const lastActivity = questionnaire.data.questions[questionnaire.data.questions.length - 1];
      const lastAnsweredIndex = lastActivity.answers && lastActivity.answers.length > 0
        ? 0
        : questionnaire.data.questions.reduce(
          ([lastIndex, lastIsAnswered]: any[], question: Activity, index: number) => {
            const isAnswered = question.answers && question.answers.length > 0;
            if (isAnswered) return [lastIndex, isAnswered];
            return lastIsAnswered ? [index, false] : [lastIndex, false];
          },
          [0, true],
        )[0];

      const nextActivity = questionnaire.data.questions[lastAnsweredIndex];
      const nextAnswer = nextActivity?.answers && nextActivity.answers[0]?.answer
        ? getAnswerFromParsedAnswer[nextActivity.questionTypeId](nextActivity)
        : undefined;
      setQuestionNumber(lastAnsweredIndex);
      setActualActivity(nextActivity);
      setLoading(false);
      setValid(nextAnswer !== undefined);
      setAnswer(nextAnswer);
    }
  }, [questionnaire, savingState]);

  useEffect(() => {
    if (questionnaire?.finish && questionnaire.finish) {
      history.replace('/finish');
    }
  }, [history, questionnaire]);

  let activity;

  if (!loading && actualActivity) {
    switch (actualActivity.questionTypeId) {
    // In Every Activity add its respective properties
    case 1:
      activity = (
        <MultipleChoice
          label={actualActivity.description}
          options={actualActivity.parameters.options || []}
          answer={answer}
          setAnswer={setAnswer}
          validate={setValid}
          minimumOptions={actualActivity.parameters.minimumOptions}
        />
      );
      break;
    case 2:
      activity = (
        <SimpleChoice
          label={actualActivity.description}
          options={actualActivity.parameters.options || []}
          answer={answer}
          setAnswer={setAnswer}
          validate={setValid}
        />
      );
      break;
    case 3:
      activity = (
        <TextQuestion
          label={actualActivity.description}
          answer={answer}
          setAnswer={setAnswer}
          validate={setValid}
        />
      );
      break;
    case 4:
      activity = (
        <RankingActivity
          label={actualActivity.description}
          answer={answer}
          setAnswer={setAnswer}
          validate={setValid}
        />
      );
      break;
    case 5:
      activity = (
        <ClosedCardSorting
          label={actualActivity.description}
          parameters={actualActivity.parameters}
          answer={answer}
          setAnswer={setAnswer}
          validate={setValid}
        />
      );
      break;
    case 6:
      activity = (
        <OpenCardSorting
          label={actualActivity.description}
          parameters={actualActivity.parameters}
          answer={answer}
          setAnswer={setAnswer}
          validate={setValid}
        />
      );
      break;
    default:
    }
  }

  const handleSkipPress = () => {
    if (actualActivity?.required) return;
    if (
      !actualActivity?.required
      && questionnaire.data
      && questionNumber === questionnaire.data.questions.length - 1
    ) {
      finishQuestionnaire(surveyId, questionnaire.data.participationId);
    } else if (questionnaire.data && questionNumber !== questionnaire.data.questions.length - 1) {
      const nextActivity = questionnaire.data.questions[questionNumber + 1];
      const nextAnswer = nextActivity?.answers && nextActivity?.answers[0]?.answer
        ? getAnswerFromParsedAnswer[nextActivity.questionTypeId](nextActivity)
        : undefined;

      setQuestionNumber(questionNumber + 1); // Add logic to handle start in another number
      setActualActivity(nextActivity);
      setValid(nextAnswer !== undefined);
      setAnswer(nextAnswer);
    }
  };

  const handleBackPress = () => {
    if (questionnaire.data && questionNumber !== 0) {
      const prevActivity = questionnaire.data.questions[questionNumber - 1];
      const prevAnswer = prevActivity?.answers && prevActivity.answers[0]?.answer
        ? getAnswerFromParsedAnswer[prevActivity.questionTypeId](prevActivity)
        : undefined;

      setQuestionNumber(questionNumber - 1);
      setActualActivity(prevActivity);
      setValid(prevAnswer !== undefined);
      setAnswer(prevAnswer);
    }
  };

  const handleNextPress = () => {
    const parseAnswer: {[key: number]: (answer: any) => AnswerData} = {
      1: (selectedOption) => ({
        selected: selectedOption.reduce(
          (a: number[], selected: boolean, index: number) => (selected ? [...a, index] : a),
          [],
        ),
      }),
      2: (selectedOptions) => ({ selected: [selectedOptions] }),
      3: (textAnswer) => ({ text: textAnswer }),
      4: (rank) => ({ rank }),
      5: (closedAssignation) => closedAssignation,
      6: (openAssignation) => openAssignation,
    };

    if (!valid) {
      if (actualActivity?.questionTypeId === 6) {
        alert('Please insert all the cards in a group and set a title to every group.'); // eslint-disable-line
      } else if (actualActivity?.questionTypeId === 5) {
        alert('Please insert all the cards in a group'); // eslint-disable-line
      } else {
        alert('Please select an answer.'); // eslint-disable-line
      }
    } else if (questionnaire?.data && actualActivity) {
      const parsedAnswer: AnswerData = parseAnswer[actualActivity?.questionTypeId](answer);
      setParsedAnswer(questionNumber, parsedAnswer);

      if (questionNumber !== questionnaire?.data?.questions?.length - 1) {
        const nextActivity = questionnaire?.data?.questions[questionNumber + 1];
        const nextAnswer = nextActivity?.answers && nextActivity.answers[0]?.answer
          ? getAnswerFromParsedAnswer[nextActivity?.questionTypeId](nextActivity)
          : undefined;

        setQuestionNumber(questionNumber + 1); // Add logic to handle start in another number
        setActualActivity(nextActivity);
        setAnswer(nextAnswer);
        setSavingState(true);
        setValid(nextAnswer !== undefined);
      } else {
        finishQuestionnaire(surveyId, questionnaire.data.participationId);
      }
    }
  };

  return (
    <div className="questionnaire">
      <ActivityNumber activityNumber={questionNumber + 1} />

      {!loading && (
        <div
          className={`questionnaire__activity ${
            actualActivity?.questionTypeId === 5
            || actualActivity?.questionTypeId === 6
              ? 'questionnaire__activity--card-sorting' : ''
          }`}
        >
          {activity}
        </div>
      )}

      <div className="questionnaire__buttons">
        <Arrow
          handlePress={handleBackPress}
          label="Back"
          icon={faChevronLeft}
          reverse
          show={questionNumber !== 0}
        />

        <button
          onClick={handleNextPress}
          type="button"
          disabled={actualActivity?.required && !valid}
        >
          {questionnaire?.data && questionNumber === questionnaire.data.questions.length - 1
            ? 'Finish'
            : 'Next'}
        </button>
        <Arrow disabled={actualActivity?.required || false} handlePress={handleSkipPress} label="Skip" icon={faChevronRight} show />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userData: state.appReducer.toJS().userData,
  questionnaire: state.questionnaireReducer.toJS().questionnaire,
});

const mapDispatchToProps = (dispatch: any) => {
  const { getQuestionnaire, setAnswer, finishQuestionnaire } = bindActionCreators(
    questionnaireActions,
    dispatch,
  );

  return {
    getQuestionnaire,
    setAnswer,
    finishQuestionnaire,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
