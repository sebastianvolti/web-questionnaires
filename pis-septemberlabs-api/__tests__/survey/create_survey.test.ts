import controller from '../../src/apiV1/survey/survey.controller';
import { when } from 'jest-when';
import * as httpMocks from 'node-mocks-http';

const findByPkMock = jest.fn();
when(findByPkMock).mockReturnValue(null).calledWith(1).mockReturnValue({
  id: 1,
  name: 'test question type',
  inputSchema: {},
  outputSchema: {},
});

jest.mock('../../src/db/models/survey.model', () => {
  return {
    Survey: jest.fn().mockReturnValue({
      save: jest.fn().mockReturnValue({
        id: 1,
        title: 'test',
        projectName: 'test project',
      }),
    }),
  };
});

jest.mock('../../src/db/models/questionType.model', () => {
  return {
    QuestionType: {
      findByPk: jest.fn((id: number) => findByPkMock(id)),
    },
  };
});

describe('create survey', () => {
  test('create survey should be successful', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        title: 'test',
        project_name: 'test project',
        status: 'draft',
        questions: [
          {
            description: 'question test',
            required: false,
            questionTypeId: 1,
            parameters: {},
          },
        ],
      },
    });

    const res = httpMocks.createResponse();

    await controller.create(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.json()._getData().success).toBe(true);
  });

  test('create survey with activities should be successful', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        title: 'test',
        project_name: 'test project',
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

    await controller.create(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.json()._getData().success).toBe(true);
    expect(res.json()._getData().data.title).toBe(req.body.title);
    expect(res.json()._getData().data.projectName).toBe(req.body.project_name);
  });
});
