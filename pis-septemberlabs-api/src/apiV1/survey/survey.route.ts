import { Router } from 'express';
import * as controller from './survey.controller';

import isUserAuthenticated from '../../helpers/isUserAuthenticated';
import isAdminAuthenticated from '../../helpers/isAdminAuthenticated';
import { validateCreationStatus } from './survey.validations';

const survey: Router = Router();

survey.get('/surveys', isAdminAuthenticated, controller.index);

survey.get('/survey/:surveyHash', isUserAuthenticated, controller.show);

survey.get('/survey/admin/:surveyId', isAdminAuthenticated, controller.getAdmin);

survey.get('/questionTypes', isUserAuthenticated, controller.getQuestionTypes);

survey.post('/survey', [validateCreationStatus, isAdminAuthenticated], controller.create);

survey.put('/survey/:surveyId', isAdminAuthenticated, controller.update);

survey.put('/survey/publish/:surveyId', isAdminAuthenticated, controller.publish);

survey.put('/survey/close/:surveyId', isAdminAuthenticated, controller.close);

survey.delete('/survey/:surveyId', isAdminAuthenticated, controller.remove);

survey.post('/survey/:surveyId/invite', isAdminAuthenticated, controller.invite);

export default survey;
