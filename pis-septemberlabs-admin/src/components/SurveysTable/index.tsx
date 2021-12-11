import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CloseSurveyButton from '../../components/Buttons/CloseSurveyButton';
import SurveyResultsButton from '../../components/Buttons/SurveyResultsButton';
import InviteSurveyButton from '../../components/Buttons/InviteSurveyButton';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';

import * as questionnaireActions from '../../redux/actions/questionnaireActions';

import './index.scss';
import api from '../../api';

type Mode = 'all-surveys' | 'drafts' | 'active-surveys' | 'closed-surveys';

type Survey = {
  id: number;
  hash?:string;
  title: string;
  projectName: string;
  status: string;
  questionsCount: number;
  answersCount?: number;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  endedAt?: string;
};

type Props = {
  mode: Mode;
  data: Survey[];
  setSurveys?(value: any): any;
  setIsEditing(value: boolean): any;
};

const SurveysTable: React.FunctionComponent<Props> = ({
  mode,
  data,
  setSurveys,
  setIsEditing,
}: Props): JSX.Element => {
  const history = useHistory();

  const renderTableHeaders = () => {
    switch (mode) {
    case 'all-surveys':
      return (
        <tr>
          <th>Name</th>
          <th>Project</th>
          <th>Answers</th>
          <th />
        </tr>
      );
    case 'drafts':
      return (
        <tr>
          <th>Name</th>
          <th>Project</th>
          <th>Questions</th>
          <th>Last Update</th>
          <th />
        </tr>
      );
    case 'active-surveys':
      return (
        <tr>
          <th>Name</th>
          <th>Project</th>
          <th>Answers</th>
          <th>Start Date</th>
          <th> </th>
          <th style={{ width: '100px' }}> </th>
        </tr>
      );
    case 'closed-surveys':
      return (
        <tr>
          <th>Name</th>
          <th>Project</th>
          <th>Answers</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th />
        </tr>
      );
    default:
      return (
        <tr>
          <th>Name</th>
          <th>Project</th>
        </tr>
      );
    }
  };

  const handleShowResultsClick = (survey: Survey) => {
    history.push(`/results/${survey.id}`);
  };

  const handleCloseSurveyClick = async (survey: Survey) => {
    const res = await api.closeQuestionnaire(survey.id);
    if (res.success) {
      history.push(`/results/${survey.id}`);
    }
  };

  const handleInviteSurveyClick = (survey: Survey) => {
    const textArea = document.createElement('textarea');

    textArea.value = `${process.env.REACT_APP_USER_URL}/questionnaire/${survey.hash}`;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleEditClick = (event: any, survey: Survey) => {
    event.stopPropagation();
    setIsEditing(true);
    history.push(`/questionnaire/${survey.id}`);
  };

  const handleDeleteClick = (event: any, survey: Survey) => {
    event.stopPropagation();
    api.deleteQuestionnaire(survey.id);
    const newData = data;
    newData.splice(newData.indexOf(survey), 1);
    if (setSurveys) setSurveys([...newData]);
  };

  const renderButton = (survey: Survey) => {
    switch (survey.status) {
    case 'published':
      return <CloseSurveyButton onClick={() => handleCloseSurveyClick(survey)} />;
    case 'closed':
      return <SurveyResultsButton onClick={() => handleShowResultsClick(survey)} />;
    default:
      return null;
    }
  };

  const renderTableData = () => {
    switch (mode) {
    case 'all-surveys':
      return data.map((survey) => (
        <tr key={survey.id}>
          <td>{survey.title}</td>
          <td>{survey.projectName}</td>
          <td>{survey.answersCount}</td>
          <td className="align-content-right">{renderButton(survey)}</td>
        </tr>
      ));
    case 'drafts':
      return data.map((survey) => (
        <tr className="surveys-table__row-container" key={survey.id}>
          <td>{survey.title}</td>
          <td>{survey.projectName}</td>
          <td>{survey.questionsCount}</td>
          <td>{survey.updatedAt}</td>
          <td>
            <div className="surveys-table-icons">
              <EditIcon className="surveys-table-icons__edit" onClick={(event) => handleEditClick(event, survey)} />
              <FontAwesomeIcon
                icon={faTimes}
                onClick={(event) => handleDeleteClick(event, survey)}
              />
            </div>
          </td>
        </tr>
      ));
    case 'active-surveys':
      return data.map((survey) => (
        <tr key={survey.id}>
          <td>{survey.title}</td>
          <td>{survey.projectName}</td>
          <td>{survey.answersCount}</td>
          <td>{survey.startedAt}</td>
          <td className="align-content-right" >
            <CloseSurveyButton onClick={() => handleCloseSurveyClick(survey)} />
          </td>
          <td className="align-content-right" >
            <InviteSurveyButton onClick={() => handleInviteSurveyClick(survey)} />
          </td>
        </tr>
      ));
    case 'closed-surveys':
      return data.map((survey) => (
        <tr key={survey.id}>
          <td>{survey.title}</td>
          <td>{survey.projectName}</td>
          <td>{survey.answersCount}</td>
          <td>{survey.startedAt}</td>
          <td>{survey.endedAt}</td>
          <td>
            <SurveyResultsButton onClick={() => handleShowResultsClick(survey)} />
          </td>
        </tr>
      ));
    default:
      return (
        <>
          <tr>
            <td>Survey 1</td>
            <td>Project 1</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Survey 2</td>
            <td>Project 3</td>
            <td>13</td>
          </tr>
        </>
      );
    }
  };

  return (
    <div>
      <table className="surveys-table align-content-center">
        <thead className="surveys-table-header">{renderTableHeaders()}</thead>
        <tbody className="surveys-table-body">{renderTableData()}</tbody>
      </table>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    setIsEditing,
  } = bindActionCreators(questionnaireActions, dispatch);

  return {
    setIsEditing,
  };
};

export default connect(null, mapDispatchToProps)(SurveysTable);
