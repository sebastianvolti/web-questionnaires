import controller from '../../src/apiV1/survey/survey.controller';
import * as httpMocks from 'node-mocks-http';
import { when } from 'jest-when';
import Survey from '../../src/db/models/survey.model';

const findByPkMock = jest.fn();
when(findByPkMock).calledWith(1, undefined).mockReturnValue({
  id: 1,
  title: 'test',
  projectName: 'test',
  status: 'published',
});
when(findByPkMock)
  .calledWith(1, {})
  .mockReturnValue({
    id: 1,
    title: 'test',
    projectName: 'test',
    status: 'published',
    questions: [
      {
        id: 1,
        description: 'question test',
        required: false,
        questionTypeId: 1,
        parameters: {},
        answers: [
          {
            id: 1,
            participationId: 1,
            questionId: 1,
            answer: {},
          },
        ],
      },
    ],
  });

const updateByPkMock = jest.fn();
when(updateByPkMock).mockReturnValue(null).calledWith(1).mockReturnValue({
  id: 1,
  title: 'test',
  projectName: 'test',
  status: 'published',
});

const deleteByPkSurveyMock = jest.fn();
when(deleteByPkSurveyMock).mockReturnValue(null).calledWith(1).mockReturnValue({
  id: 1,
  title: 'test',
  projectName: 'test',
  status: 'published',
});

const toJsonMock = jest.fn();
when(toJsonMock).mockReturnValue({
  id: 1,
  title: 'test',
  projectName: 'test',
  status: 'published',
  questions: [
    {
      id: 1,
      description: 'question test',
      required: false,
      questionTypeId: 1,
      parameters: {},
      answers: [
        {
          id: 1,
          participationId: 1,
          questionId: 1,
          answer: {},
        },
      ],
    },
  ],
});

jest.mock('../../src/db/models/survey.model', () => {
  return {
    Survey: {
      findByPk: jest.fn((id: Number, includeExpression: any) =>
        includeExpression == undefined ? findByPkMock(id) : findByPkMock(id, {})
      ),
      update: jest.fn((_: Survey, whereIdExpression: any) =>
        updateByPkMock(whereIdExpression.where.id)
      ),
      destroy: jest.fn((whereIdExpression: any) =>
        deleteByPkSurveyMock(whereIdExpression.where.id)
      ),
      toJSON: jest.fn(() => toJsonMock()),
    },
  };
});

const createMock = jest.fn();
when(createMock).mockReturnValue(null).calledWith(1).mockReturnValue({
  id: 1,
  description: 'question name',
  questionTypeId: 1,
});

const deleteByPkQuestionMock = jest.fn();
when(deleteByPkQuestionMock)
  .mockReturnValue(null)
  .calledWith(1)
  .mockReturnValue({
    id: 1,
    description: 'question test',
    required: false,
    questionTypeId: 1,
    parameters: {},
  });

jest.mock('../../src/db/models/question.model', () => {
  return {
    Question: {
      create: jest.fn(() => createMock()),
      destroy: jest.fn((whereIdExpression: any) =>
        deleteByPkQuestionMock(whereIdExpression.where.id)
      ),
    },
  };
});

const findOrCreateMock = jest.fn();
when(findOrCreateMock)
  .mockReturnValue(null)
  .calledWith(1, 1)
  .mockReturnValue([
    {
      id: 1,
      surveyId: 1,
      userId: 1,
      status: 'started',
    },
    true,
  ]);

jest.mock('../../src/db/models/participation.model', () => {
  return {
    Participation: {
      findOrCreate: jest.fn((whereExpression: any) =>
        findOrCreateMock(
          whereExpression.where.userId,
          whereExpression.where.surveyId
        )
      ),
    },
  };
});

describe('show survey', () => {
  test('show survey should be successful', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        surveyId: 1,
      },
      session: {
        passport: {
          user: 1,
        },
      },
    });

    const res = httpMocks.createResponse();

    await controller.show(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json()._getData().success).toBe(true);
    expect(res.json()._getData().message).toBe(null);
  });

  test('show survey should be not found', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        surveyId: 42,
      },
    });

    const res = httpMocks.createResponse();

    await controller.show(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.json()._getData().success).toBe(false);
  });
});

describe('update survey', () => {
  test('update survey should be successful', async () => {
    const req = httpMocks.createRequest({
      method: 'PUT',
      params: {
        surveyId: 1,
      },
      body: {
        title: 'test updated',
        projectName: 'test project',
      },
    });

    const res = httpMocks.createResponse();

    await controller.update(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json()._getData().success).toBe(true);
  });

  test('update survey with activities should be successful', async () => {
    const req = httpMocks.createRequest({
      method: 'PUT',
      params: {
        surveyId: 1,
      },
      body: {
        title: 'test updated',
        projectName: 'test project',
      },
    });

    const res = httpMocks.createResponse();

    await controller.update(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json()._getData().success).toBe(true);
  });

  test('update survey should be not found', async () => {
    const req = httpMocks.createRequest({
      method: 'PUT',
      params: {
        surveyId: 23,
      },
      body: {
        title: 'test updated',
        projectName: 'test project',
        questions: [
          {
            description: 'Test description of activity',
            required: false,
            questionTypeId: 1,
            parameters: {},
          },
        ],
      },
    });

    const res = httpMocks.createResponse();

    await controller.update(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.json()._getData().success).toBe(false);
  });
});

describe('delete survey', () => {
  test('delete survey should be successful', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        surveyId: 1,
      },
    });

    const res = httpMocks.createResponse();

    await controller.remove(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json()._getData().success).toBe(true);
  });

  test('delete survey should be not found', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        surveyId: 10,
      },
    });

    const res = httpMocks.createResponse();

    await controller.remove(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.json()._getData().success).toBe(false);
  });
});
