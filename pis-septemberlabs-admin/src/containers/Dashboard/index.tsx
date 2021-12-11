import React, { useState, useEffect } from 'react';

import './index.scss';

import { Redirect } from 'react-router-dom';
import SurveysTable from '../../components/SurveysTable';
import api from '../../api';

import CircledButton from '../../components/Buttons/CircledButton';

const Dashboard: React.FunctionComponent = (): JSX.Element => {
  const [surveys, setSurveys] = useState([]);
  const [metrics, setMetrics] = useState<any>({});
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    api.getListOfQuestionnaires('/v1/surveys?status=draft&count=true')
      .then((response) => {
        setMetrics(response?.count);
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
  };

  return (
    <div className="dashboard-container">
      {renderRedirect()}
      <div className="metrics-container">
        <div className="dashboard-metric">
          <div className="metric-value metric-value--orange">
            {metrics.published ? metrics.published : 0}
          </div>
          <div className="metric-label">Active Surveys</div>
        </div>
        <div className="dashboard-metric">
          <div className="metric-value metric-value--green">
            {metrics.closed ? metrics.closed : 0}
          </div>
          <div className="metric-label">Closed Surveys</div>
        </div>
        <div className="dashboard-metric">
          <div className="metric-value metric-value--blue">{metrics.total ? metrics.total : 0}</div>
          <div className="metric-label">Total Surveys</div>
        </div>
      </div>

      <div className="drafts-table-container">
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
    </div>
  );
};

export default Dashboard;
