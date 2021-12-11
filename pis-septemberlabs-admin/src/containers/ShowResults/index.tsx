import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as questionnaireActions from '../../redux/actions/questionnaireActions';

import ActivityFactory from '../../entities/ActivityFactory';
import Activity from '../../entities/Activity';

import './index.scss';

type Props = {
  match: any;
  questionnaire: any;
  getQuestionnaire(id: string): any;
  clearQuestionnaire(): any;
};

const ShowResults: React.FunctionComponent<Props> = ({
  match,
  getQuestionnaire,
  questionnaire,
  clearQuestionnaire,
}: Props): JSX.Element => {
  useEffect(() => {
    const questionnaireId = match?.params?.id;

    getQuestionnaire(questionnaireId);
  }, [match?.params?.id]);

  useEffect(() => clearQuestionnaire, [clearQuestionnaire]);
  return (
    <div className="results-container">
      <div className="results-header">{`Results - ${questionnaire?.title}`}</div>

      <div className="questions-results-container">
        {questionnaire?.questions.map((question: any, index: number) => {
          const activity: Activity = ActivityFactory.getActivityByTypeId(question.questionType.id);
          return activity.getType() !== 'closed-card-sorting' && activity.getType() !== 'open-card-sorting' && (
            <div className="question-result" key={question.id}>
              <div className="question-result-header">
                <div className="question-result-title">
                  <b>{`${index + 1}. `}</b>
                  {question.description}
                </div>
                <div className="question-result-answers-count">
                  <div className="question-resut-anwers-count-label">{`${question.answersCount} Answers`}</div>
                </div>
              </div>
              <div className="question-result-component">
                {activity.getResultsComponent(question)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  questionnaire: state.questionnaireReducer.toJS().questionnaire,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    getQuestionnaire,
    clearQuestionnaire,
  } = bindActionCreators(questionnaireActions, dispatch);

  return {
    getQuestionnaire,
    clearQuestionnaire,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowResults);
