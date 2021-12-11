import React, { useState, useEffect } from 'react';

import './index.scss';

import SurveysTable from '../../components/SurveysTable';
import api from '../../api';

const AllSurveys: React.FunctionComponent = (): JSX.Element => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.getListOfQuestionnaires('/v1/surveys')
      .then((response) => {
        setSurveys(response?.surveys);
      });
  }, []);

  return (
    <div className="table-container">
      <div className="table-header">
        <p>All Surveys</p>
      </div>

      <SurveysTable mode="all-surveys" data={surveys} />
    </div>
  );
};

export default AllSurveys;
