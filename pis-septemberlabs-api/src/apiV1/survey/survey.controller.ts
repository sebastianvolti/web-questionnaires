import * as nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import { Survey } from '../../db/models/survey.model';
import { Question } from '../../db/models/question.model';
import { QuestionType } from '../../db/models/questionType.model';
import { Answer } from '../../db/models/answer.model';
import { Participation } from '../../db/models/participation.model';
import config from '../../config/config';
import { validate } from 'jsonschema';
import * as moment from 'moment';

export async function index(req: Request, res: Response): Promise<any> {
  try {
    const surveysData = {};

    let surveys = await Survey.findAll({
      include: [
        Question, 
        { 
          model: Participation,
          where: {
            status: 'completed',
          },
          required: false,
        } 
      ],
    });

    if (req.query.count) {
      const statusCount = surveys.reduce(
        ({ total, ...byStatus }, { status }) => ({
          total: total + 1,
          ...byStatus,
          [status]: (byStatus[status] || 0) + 1,
        }),
        { total: 0 }
      );

      surveysData['count'] = statusCount;
    }

    if (req.query.status) {
      surveys = surveys.filter((survey) => survey.status == req.query.status);
    }

    const surveysResponse = surveys.map((survey) => {
      let statusSpecificData = {};

      switch (survey.status) {
        case 'closed':
          const closedSpecificData = {
            questionsCount: survey.questions.length,
            answersCount: survey.participations.length,
            endedAt: moment(survey.endedAt).format('MMM D, YYYY'),
          };

          Object.assign(statusSpecificData, closedSpecificData);
          break;
        case 'published':
          const publishedSpecificData = {
            hash: survey.hash,
            answersCount: survey.participations.length,
            startedAt: moment(survey.startedAt).format('MMM D, YYYY'),
          };

          Object.assign(statusSpecificData, publishedSpecificData);
          break;
        case 'draft':
          const draftSpecificData = {
            questionsCount: survey.questions.length,
          };

          Object.assign(statusSpecificData, draftSpecificData);
      }

      const surveyData = {
        id: survey.id,
        title: survey.title,
        projectName: survey.projectName,
        status: survey.status,
        createdAt: moment(survey.createdAt).format('MMM D, YYYY'),
        updatedAt: moment(survey.updatedAt).format('MMM D, YYYY'),
      };

      return { ...surveyData, ...statusSpecificData };
    });

    surveysData['surveys'] = surveysResponse;

    res.status(200).send({
      success: true,
      data: surveysData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function show(req: Request, res: Response): Promise<any> {
  try {
    let survey = await Survey.findOne({
      where: {
        hash: req.params.surveyHash,
      },
    });

    if (!survey || survey.status != 'published') {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }

    const [participation, created] = await Participation.findOrCreate({
      where: {
        userId: req.session.passport.user,
        surveyId: survey.id,
      },
    });

    if (!participation && !created) {
      return res.status(404).send({
        success: false,
        message: 'Participation not found',
      });
    }

    if (participation.status === 'completed') {
      return res.status(409).send({
        success: false,
        message: 'You have already completed the survey',
      });
    }

    survey = await Survey.findByPk(survey.id, {
      include: [
        {
          model: Question,
          include: [
            {
              model: Answer,
              where: {
                participationId: participation.id,
              },
              required: false,
            },
          ],
        },
      ],
    });

    const questionsToReverse = [...survey.questions];
    const questions = questionsToReverse.reverse();
    const lastAnswer =
      questions.findIndex((question) => question.answers.length > 0) + 1;

    const surveyReturnInfo = {
      ...survey.toJSON(),
      lastAnswer: lastAnswer,
      participationId: participation.id,
    };

    res.status(200).send({
      success: true,
      data: surveyReturnInfo,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function getAdmin(req: Request, res: Response): Promise<any> {
  try {
    const survey = await Survey.findByPk(req.params.surveyId, {
      include: [
        {
          model: Question,
          include: [
            {
              model: QuestionType,
            },
          ]
        },
      ],
    });

    if (!survey) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }

    if (survey.status === 'published' || survey.status === 'closed') {
      const questionsInfo = [];

      await Promise.all(survey.questions.map(async (question) => {
        await Answer.findAll({
          include: [
            {
              model: Participation,
              where: {
                status: 'completed',
              },
              required: false,
            },
          ],
          where: {
            questionId: question.id,
          },
        }).then((answers) => {
          let answerData = {};
          switch (question.questionType.name) {
            case 'SimpleSelection':
            case 'MultipleSelection':
              Array.apply(null, {length: question.parameters['options'].length}).map(Number.call, Number).forEach((key) => {
                answerData[`${key}`] = 0;
              });
              answers.forEach((answer) => {
                const selected = answer.answer['selected'];
                selected.forEach((selectedAnswer) => {
                  answerData[selectedAnswer]++;
                });
              });
              break;
            case 'Ranking':
              Array.apply(null, {length: 5}).map(Number.call, Number).forEach((key) => {
                answerData[`${key + 1}`] = 0;
              });
              let total = 0;
              answers.forEach((answer) => {
                const rank = answer.answer['rank'];
                answerData[rank]++;
                total += rank;
              });
              answerData['average'] = total / answers.length;
              break;
            case 'Text':
              answerData['results'] = [];
              answers.forEach((answer) => {
                const text = answer.answer['text'];
                answerData['results'].push(text);
              });
              break;
            case 'Closed Card Sorting':
              //TODO: to be done
              break;
            case 'Open Card Sorting':
              //TODO: to be done
              break;
            default:
              throw Error('Unknown questiontype');
          }

          const questionData = { ...question.toJSON(), answersCount: answers.length, answerData }
          questionsInfo.push(questionData);
        }).catch((err) => {
          res.status(500).send({
            success: false,
            message: err.toString(),
          });
        });
      }))

      const surveyData = { ...survey.toJSON(), questions: questionsInfo };

      return res.status(200).send({
        success: true,
        data: surveyData,
      });
    }

    res.status(200).send({
      success: true,
      data: survey,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function create(req: Request, res: Response): Promise<any> {
  const RESPONSE_NOT_VALID = 'RESPONSE_NOT_VALID';
  try {
    const { title, projectName, questions, status } = req.body;

    const body = {
      title,
      projectName,
      status,
    };


    await Promise.all(req.body.questions.map(async (question) => {
      const questionTypeId = question?.questionTypeId;
      const questionType = await QuestionType.findByPk(questionTypeId);

      const instance = question.parameters;
      const schema = questionType.inputSchema;
      const response = validate(instance, schema);


      if (!response.valid) throw RESPONSE_NOT_VALID;
    }));

    if (questions) {
      body['questions'] = questions;
    }

    if (status === 'published') {
      body['startedAt'] = Date.now();
      body['hash'] = hashCode(title + projectName + Date.now().toString()).toString();
    }

    const survey = new Survey(body, {
      include: [Question],
    });

    const newSurvey = await survey.save();

    res.status(201).send({
      success: true,
      data: newSurvey,
    });
  } catch (err) {
    if(err === RESPONSE_NOT_VALID) {
      res.status(404).send({
        success: false,
        message: 'Survey not found.',
      });
    } else {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  }
}

export async function update(req: Request, res: Response): Promise<any> {
  try {
    const updateQuestions = req.body.questions;

    if (updateQuestions) {
      await Promise.all(updateQuestions.map(async (newQuestion) => {
        if (newQuestion.id) {
          // Destroy Questions
          if (newQuestion._destroy) {
            Question.destroy({ where: { id: newQuestion.id } });
          } else {
            // Update Questions
            const question = await Question.update(newQuestion, {
              where: { id: newQuestion.id },
            });
          }
        } else {
          const question = await Question.create({
            ...newQuestion,
            surveyId: parseInt(req.params.surveyId),
          });
        }
      }));
    }

    if (req.body.status === 'published') {
      req.body['startedAt'] = Date.now();
      req.body['hash'] = hashCode(req.body.title + req.body.projectName + Date.now().toString()).toString();
    }

    const surveyUpdated = await Survey.update(req.body, {
      where: {
        id: req.params.surveyId,
        status: 'draft',
      },
    });

    if (!surveyUpdated) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function remove(req: Request, res: Response): Promise<any> {
  try {
    const survey = await Survey.findByPk(req.params.surveyId, {
      include: [Question],
    });

    if (survey && survey.questions) {
      const questions = survey.questions;

      // Delete questions
      if (questions) {
        questions.forEach((question) => {
          Question.destroy({ where: { id: question.id } });
        });
      }
    }

    const surveyDestroyed = await Survey.destroy({
      where: { id: req.params.surveyId },
    });

    if (!surveyDestroyed) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
      data: null,
    });
  }
}

export async function getQuestionTypes(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const questionTypes = await QuestionType.findAll();

    if (!questionTypes) {
      return res.status(404).send({
        success: false,
        message: 'There are no QuestionTypes on the system',
      });
    }

    let returnInfo: { [id: string]: string } = {};

    questionTypes.map((questionType: QuestionType) => {
      returnInfo[questionType.id] = questionType.name;
    });

    res.status(200).send({
      success: true,
      data: returnInfo,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function invite(req: Request, res: Response): Promise<any> {
  try {
    const survey = await Survey.findByPk(req.params.surveyId);

    if (!survey) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }

    if (survey.status !== 'published') {
      return res.status(400).send({
        success: false,
        message: 'Survey must be published in order to invite users',
      });
    }

    const { receiversMail } = req.body;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.GMAIL_USER_INVITE_SENDER,
        pass: config.GMAIL_PWD_INVITE_SENDER,
      },
    });

    const surveyURL = config.APP + '/questionnaire/' + survey.hash;

    var mailOptions = {
      from: config.GMAIL_USER_INVITE_SENDER,
      to: receiversMail,
      subject: 'Te han invitado a realizar una encuesta',
      html: `Te invitaron a realizar la siguiente <a href = '${surveyURL}'>encuesta</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send({
          success: false,
          message: error,
        });
      } else {
        res.status(200).send({
          success: true,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function publish(req: Request, res: Response): Promise<any> {
  try {
    const survey = await Survey.findByPk(req.params.surveyId);

    if (!survey) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }

    if (survey.status === 'published') {
      return res.status(400).send({
        success: false,
        message: 'Survey is already published',
      });
    }

    survey.update({
      status: 'published',
      startedAt: Date.now(),
      hash: hashCode(survey.title + survey.projectName + Date.now().toString()).toString(),
    });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function close(req: Request, res: Response): Promise<any> {
  try {
    const survey = await Survey.findByPk(req.params.surveyId);

    if (!survey) {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    }

    if (survey.status !== 'published') {
      return res.status(400).send({
        success: false,
        message: 'Survey must be published in order to close it',
      });
    }

    survey.update({
      status: 'closed',
      endedAt: Date.now(),
    });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

function hashCode(string) : Number {
  let hash = 0, i, chr;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  if (hash < 0) {
    hash *= -1;
  }
  return hash;
}

export default {
  index,
  show,
  getAdmin,
  create,
  update,
  remove,
  getQuestionTypes,
  invite,
  publish,
  close,
};
