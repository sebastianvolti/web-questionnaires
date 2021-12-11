import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActivityFactory from '../../entities/ActivityFactory';
import Activity from '../../entities/Activity';
import TextAnswerEntity from '../../entities/TextAnswer';
import RankingEntity from '../../entities/Ranking';
import ActivitySelectorModal from '../../components/ActivitySelectorModal';
import MultipleChoice from '../../entities/MultipleChoice';
import SingleChoice from '../../entities/SingleChoice';
import ActivityItem from '../../components/ActivityItem';

import * as questionnaireActions from '../../redux/actions/questionnaireActions';

import './index.scss';
import OpenCardSorting from '../../entities/OpenCardSorting';
import ClosedCardSorting from '../../entities/ClosedCardSorting';

type Props = {
  isEditing: boolean;
  match: any;
  questionnaire: any;
  clearQuestionnaire(): any;
  setIsEditing(value: boolean): any;
  getQuestionnaire(id: string): any;
  saveQuestionnaireIsSuccess: boolean,
  error: any,
  saveQuestionnaire(questionnaire: any): void,
};

const Questionnaire: React.FunctionComponent<Props> = ({
  isEditing,
  match,
  clearQuestionnaire,
  getQuestionnaire,
  setIsEditing,
  questionnaire,
  saveQuestionnaireIsSuccess,
  error,
  saveQuestionnaire,
}: Props): JSX.Element => {
  const [title, setTitle] = useState('');
  const [projectName, setProjectName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [surveyId, setSurveyId] = useState<string|null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity>();
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(-1);
  const [status, setStatus] = useState('');

  const history = useHistory();

  useEffect(() => { // eslint-disable-line
    const id = match?.params?.id;
    if (!surveyId) {
      if (isEditing) {
        getQuestionnaire(id);
      } else if (match?.params?.id) {
        getQuestionnaire(id);
      }

      if (id) {
        setSurveyId(id);
      }
    }
  }, [getQuestionnaire, isEditing, match, surveyId]);

  useEffect(() => clearQuestionnaire, [clearQuestionnaire]);

  useEffect(() => {
    if (error) alert(error); // eslint-disable-line
  }, [error]);

  useEffect(() => {
    if (saveQuestionnaireIsSuccess) {
      const url = status === 'published' ? '/active-surveys' : '/drafts';
      history.push(url);
    }
  }, [saveQuestionnaireIsSuccess, history, status]);

  const handleActivitySave = (activity: Activity) => {
    if (currentActivityIndex === -1) {
      setActivities([...activities, activity]);
      setCurrentActivity(undefined);
    } else {
      setActivities([
        ...activities.slice(0, currentActivityIndex),
        activity,
        ...activities.slice(currentActivityIndex + 1),
      ]);
      setCurrentActivity(undefined);
      setCurrentActivityIndex(-1);
    }
  };

  useEffect(() => {
    if (questionnaire) {
      if (questionnaire?.status === 'draft') {
        setIsEditing(true);
      }

      setTitle(questionnaire?.title);
      setProjectName(questionnaire?.projectName);
      const newQuestions = questionnaire?.questions;
      const newActivities: any = [];

      newQuestions.forEach((ques: any) => {
        const questionType = ques?.questionType?.name;

        switch (questionType) {
        case 'Text':
          const textActivity = ActivityFactory.getActivity('text') as TextAnswerEntity;
          textActivity.setQuestion(ques?.description);
          textActivity.setIsRequired(ques?.required);
          textActivity.setId(ques?.id);
          newActivities.push(textActivity);
          break;
        case 'MultipleSelection':
          const multActivity = ActivityFactory.getActivity('multiple-choice') as MultipleChoice;
          multActivity.setQuestion(ques?.description);
          multActivity.setIsRequired(ques?.required);
          multActivity.setAnswer(ques?.parameters?.options);
          multActivity.setId(ques?.id);
          newActivities.push(multActivity);
          break;
        case 'SimpleSelection':
          const simpleActivity = ActivityFactory.getActivity('single-choice') as SingleChoice;
          simpleActivity.setQuestion(ques?.description);
          simpleActivity.setIsRequired(ques?.required);
          simpleActivity.setAnswer(ques?.parameters?.options);
          simpleActivity.setId(ques?.id);
          newActivities.push(simpleActivity);
          break;
        case 'Ranking':
          const rankingActivity = ActivityFactory.getActivity('ranking') as RankingEntity;
          rankingActivity.setQuestion(ques?.description);
          rankingActivity.setIsRequired(ques?.required);
          rankingActivity.setId(ques?.id);
          newActivities.push(rankingActivity);
          break;
        case 'Closed Card Sorting':
          const closedCardSortingActivity = ActivityFactory.getActivity('closed-card-sorting') as ClosedCardSorting;
          closedCardSortingActivity.setQuestion(ques?.description);
          closedCardSortingActivity.setIsRequired(ques?.required);
          closedCardSortingActivity.setId(ques?.id);
          closedCardSortingActivity.setCard(ques?.parameters?.items);
          closedCardSortingActivity.setGroup(ques?.parameters?.categories);
          newActivities.push(closedCardSortingActivity);
          break;
        case 'Open Card Sorting':
          const openCardSortingActivity = ActivityFactory.getActivity('open-card-sorting') as OpenCardSorting;
          openCardSortingActivity.setQuestion(ques?.description);
          openCardSortingActivity.setIsRequired(ques?.required);
          openCardSortingActivity.setId(ques?.id);
          openCardSortingActivity.setCard(ques?.parameters?.items);
          newActivities.push(openCardSortingActivity);
          break;
        default:
          break;
        }
      });

      setActivities(newActivities);
    }
  }, [questionnaire, setIsEditing]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleActivityDelete = (index: number) => {
    const newActivities = [...activities];
    if (newActivities[index].getId() !== 0) {
      newActivities[index].setDestroyed(true);
    } else {
      newActivities.splice(index, 1);
    }

    setActivities(newActivities);
  };

  const resetActivity = () => {
    setCurrentActivity(undefined);
  };

  const resetActivityIndex = () => {
    setCurrentActivityIndex(-1);
  };

  const handleActivityEdit = (index: number) => {
    setCurrentActivity(activities[index]);
    setCurrentActivityIndex(index);
    toggleModal();
  };

  const activityTypesIds: {[questionType: string]: number} = {
    'multiple-choice': 1,
    'single-choice': 2,
    text: 3,
    ranking: 4,
    'closed-card-sorting': 5,
    'open-card-sorting': 6,
  };

  const parseParameters: {
    [questionType: string]: (activity: Activity) => any;
  } = {
    'multiple-choice': (activity) => ({
      options: (activity as MultipleChoice).getAnswer(),
    }),
    'single-choice': (activity) => ({
      options: (activity as SingleChoice).getAnswer(),
    }),
    text: () => ({}),
    ranking: () => ({}),
    'open-card-sorting': (activity) => ({
      items: (activity as OpenCardSorting).getCard(),
    }),
    'closed-card-sorting': (activity) => ({
      items: (activity as ClosedCardSorting).getCard(),
      categories: (activity as ClosedCardSorting).getGroup(),
    }),
  };

  const handleSave = (newStatus: string) => {
    const body = {
      title,
      projectName,
      status: newStatus,
      questions: activities.map((activity) => {
        const questionsBody: any = {
          questionTypeId: activityTypesIds[activity.getType()],
          description: activity.getQuestion(),
          required: activity.getIsRequired(),
          parameters: parseParameters[activity.getType()](activity),
          _destroy: activity.getDestroyed(),
        };

        if (activity.getId() !== 0) {
          questionsBody.id = activity.getId();
        }

        return questionsBody;
      }),
    };

    setStatus(newStatus);

    saveQuestionnaire({
      body,
      surveyId: isEditing ? surveyId : undefined,
    });
  };
  const handleCancel = () => history.push('/dashboard');

  const handleNameChange = ({ currentTarget: { value } }: any) => setTitle(value);
  const handleProjectChange = ({ currentTarget: { value } }: any) => setProjectName(value);

  return (
    <div className="questionnaire">
      <div className="questionnaire__content">
        <h1 className="questionnaire__main-title">Create Survey</h1>
        <div className="questionnaire__input-header-fields">
          <div className="questionnaire__field--name questionnaire__field">
            <span>Name</span>
            <input type="text" onChange={handleNameChange} value={title} autoFocus />
          </div>
          <div className="questionnaire__field--project questionnaire__field">
            <span>Project</span>
            <input
              type="text"
              onChange={handleProjectChange}
              value={projectName}
            />
          </div>
        </div>

        <h1 className="questionnaire__question-title">Questions</h1>
        {activities.length ? (
          <div>
            <div className="questionnaire__add-question-button">
              <button type="button" onClick={toggleModal}>
                <p>+ Add Question</p>
              </button>
            </div>
            <div className="questionnaire__activity-list">
              {activities.map((activity: Activity, index: number) => !activity.getDestroyed() && (
                <ActivityItem
                  key={index.toString()}
                  index={index}
                  title={activity.getQuestion()}
                  handleDelete={handleActivityDelete}
                  handleEdit={handleActivityEdit}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="questionnaire__activities-empty"
            onClick={toggleModal}
          >
            Click here to start creating your questions!
          </div>
        )}

        <div className="questionnaire__flow-buttons">
          <button
            className="questionnaire__button--cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="questionnaire__button--save-draft"
            type="button"
            disabled={projectName.trim() === '' || title.trim() === ''}
            onClick={() => handleSave('draft')}
          >
            {isEditing ? 'Update Draft' : 'Save Draft'}
          </button>
          <button
            className="questionnaire__button--save-publish"
            type="button"
            disabled={projectName.trim() === '' || title.trim() === '' || activities.length === 0}
            onClick={() => handleSave('published')}
          >
            Save and Publish
          </button>
        </div>

        <ActivitySelectorModal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          currentActivity={currentActivity}
          saveActivity={handleActivitySave}
          resetActivity={resetActivity}
          resetActivityIndex={resetActivityIndex}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isEditing: state.questionnaireReducer.toJS().isEditing,
  questionnaire: state.questionnaireReducer.toJS().questionnaire,
  saveQuestionnaireIsSuccess: state.questionnaireReducer.toJS().saveQuestionnaireIsSuccess,
  error: state.questionnaireReducer.toJS().error,
});

const mapDispatchToProps = (dispatch: any) => {
  const {
    getQuestionnaire,
    clearQuestionnaire,
    setIsEditing,
    saveQuestionnaire,
  } = bindActionCreators(questionnaireActions, dispatch);

  return {
    getQuestionnaire,
    clearQuestionnaire,
    setIsEditing,
    saveQuestionnaire,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
