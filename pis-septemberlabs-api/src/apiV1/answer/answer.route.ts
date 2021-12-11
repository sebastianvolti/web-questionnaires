import { Router } from 'express';
import * as controller from './answer.controller';

import isUserAuthenticated from '../../helpers/isUserAuthenticated';
import validateAnswers from './answer.validations';

const answer: Router = Router();

answer.post('/answers', [validateAnswers, isUserAuthenticated], controller.save);

answer.post('/questionnaire/finish/:surveyId', isUserAuthenticated, controller.finish);

export default answer;
