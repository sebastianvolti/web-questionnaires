import React, { useState, useEffect } from 'react';

import './index.scss';

import SurveysTable from '../../components/SurveysTable';
import api from '../../api';

const ClosedSurveys: React.FunctionComponent = (): JSX.Element => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.getListOfQuestionnaires('/v1/surveys?status=closed')
      .then((response) => {
        setSurveys(response?.surveys);
      });
  }, []);

  return (
    <div className="table-container">
      <div className="table-header">
        <p>Closed Surveys</p>
      </div>

      <SurveysTable mode="closed-surveys" data={surveys} />
    </div>
  );
};

export default ClosedSurveys;
