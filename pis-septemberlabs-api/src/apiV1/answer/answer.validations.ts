import { QuestionType } from '../../db/models/questionType.model';
import { Question } from '../../db/models/question.model';
import { validate } from 'jsonschema';

const validateAnswers = async (req, res, next) => {
  const question = await Question.findByPk(req.body.questionId, {
    include: [QuestionType],
  });

  const questionType: any = question?.questionType;

  const instance = req.body.answer;
  const schema = questionType.outputSchema;
  const response = validate(instance, schema);

  if (response.valid) {
    next();
  } else {
    res.status(404).send({
      success: false,
      message: 'Survey not found.',
    });
  }
};

export default validateAnswers;
