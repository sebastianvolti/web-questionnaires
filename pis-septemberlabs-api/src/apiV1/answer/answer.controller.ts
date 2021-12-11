import { Request, Response } from 'express';
import { Survey } from '../../db/models/survey.model';
import { Question } from '../../db/models/question.model';
import { Answer } from '../../db/models/answer.model';
import { Participation } from '../../db/models/participation.model';

export async function save(req: Request, res: Response): Promise<any> {
  try {
    const { participationId, questionId, answer } = req.body;

    const participation = await Participation.findOne({
      where: {
        id: participationId
      }
    });

    if (!participation) {
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

    const question = await Question.findOne({
      where: {
        id: questionId,
        surveyId: participation.surveyId,
      }
    });

    if (!question) {
      return res.status(404).send({
        success: false,
        message: `Question ${questionId} not found for Survey ${participation.surveyId}`,
      });
    }

    const [answerInstance, answerCreated] = await Answer.findOrCreate({
      where: {
        participationId: participationId,
        questionId: questionId,
      },
      defaults: {
        answer: answer,
      },
    });

    if (!answerInstance && !answerCreated) {
      return res.status(404).send({
        success: false,
        message: 'Answer not found',
      });
    } else {
      await answerInstance.update({ answer: answer });
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

export async function finish(req: Request, res: Response): Promise<any> {
  try {
    const { participationId } = req.body;

    const participation = await Participation.findOne({
      where: {
        id: participationId
      }
    });

    if (!participation) {
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

    const survey = await Survey.findByPk(participation.surveyId, {
      include: [{
        model: Question,
        include: [{
          model: Answer,
          where: {
            participationId: participation.id,
          },
          required: false,
        }],
      }],
    });
    
    if (!survey || survey.status != 'published') {
      return res.status(404).send({
        success: false,
        message: 'Survey not found',
      });
    };
    
    survey.questions.forEach(async (question) => {
      if (question.required) {
        const answerInstance = await Answer.findOne({
          where: {
            participationId: participationId,
            questionId: question.id,
          }
        });

        if (!answerInstance.answer) {
          return res.status(400).send({
            success: false,
            message: 'There are required questions that you have not answered',
          });
        }
      }
    })

    participation.update({
      status: 'completed',
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

export default { save };
