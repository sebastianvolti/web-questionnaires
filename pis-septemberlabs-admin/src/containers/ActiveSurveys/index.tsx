import React, { useState, useEffect } from 'react';

import './index.scss';

import SurveysTable from '../../components/SurveysTable';
import api from '../../api';

const ActiveSurveys: React.FunctionComponent = (): JSX.Element => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.getListOfQuestionnaires('/v1/surveys?status=published')
      .then((response) => {
        setSurveys(response?.surveys);
      });
  }, []);

  return (
    <div className="table-container">
      <div className="table-header">
        <p>Active Surveys</p>
      </div>

      <SurveysTable mode="active-surveys" data={surveys} />
    </div>
  );
};

export default ActiveSurveys;
