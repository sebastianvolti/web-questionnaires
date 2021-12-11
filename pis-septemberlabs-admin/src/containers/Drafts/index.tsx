import React, { useState, useEffect } from 'react';

import './index.scss';

import { Redirect } from 'react-router-dom';
import SurveysTable from '../../components/SurveysTable';
import api from '../../api';

import CircledButton from '../../components/Buttons/CircledButton';

const Drafts: React.FunctionComponent = (): JSX.Element => {
  const [surveys, setSurveys] = useState([]);
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    api.getListOfQuestionnaires('/v1/surveys?status=draft')
      .then((response) => {
        setSurveys(response?.surveys);
      });
  }, []);

  const handleNewSurveyClick = () => {
    setRedirect('/questionnaire');
  };

  const renderRedirect = () => {
    if (redirect !== '') {
      return <Redirect to={redirect} />;
    }

    return null;
  };

  return (
    <div className="table-container">
      {renderRedirect()}
      <div className="table-header">
        <div className="table-header__title">
          <p>Drafts</p>
        </div>
        <div className="table-header__button">
          <CircledButton primary name="New Survey" onClick={handleNewSurveyClick} />
        </div>
      </div>

      <SurveysTable mode="drafts" data={surveys} setSurveys={setSurveys} />
    </div>
  );
};

export default Drafts;
