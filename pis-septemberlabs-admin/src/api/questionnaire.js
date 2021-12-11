import baseClient from './base';

export const saveQuestionnaire = (body) => baseClient.post('/v1/survey', body)
  .then(({ data }) => data);

export const updateQuestionnaire = (surveyId, body) => baseClient.put(`/v1/survey/${surveyId}`, body)
  .then(({ data }) => data);

export const closeQuestionnaire = (surveyId) => baseClient.put(`/v1/survey/close/${surveyId}`)
  .then(({ data }) => data);

export const getQuestionnaire = (id) => baseClient.get(`/v1/survey/admin/${id}`)
  .then(({ data }) => data);

export const getListOfQuestionnaires = (url) => baseClient.get(url)
  .then(({ data }) => data)
  .then(({ data }) => data);

export const deleteQuestionnaire = (id) => baseClient.delete(`/v1/survey/${id}`)
  .then(({ data }) => data);
