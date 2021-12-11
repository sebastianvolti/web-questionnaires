import baseClient from './base';

export const getQuestionnaire = (surveyId) => baseClient
  .get(`/v1/survey/${surveyId}`)
  .then(({ data }) => data)
  .catch((err) => {
    switch (err.response.status) {
    case 401:
      window.location.replace(`/login/${surveyId}`);
      break;
    default:
      window.location.replace(`/error?status=${err.response.status}`);
      break;
    }
  });

export const finishQuestionnaire = (surveyId, body) => baseClient.post(`/v1/questionnaire/finish/${surveyId}`, body).then(({ data }) => data);

export const sendAnswer = (participationId, questionId, answer) => baseClient.post('/v1/answers', { participationId, questionId, answer });
