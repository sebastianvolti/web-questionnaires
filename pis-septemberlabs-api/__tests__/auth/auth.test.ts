import * as request from 'supertest';
import app from '../../src/App/app';

jest.mock('../../src/db/models/user.model', () => {
  return {
    User: {
      findByPk: jest.fn((_: string) => ({
        id: '12345',
        name: 'test',
        lastName: 'test',
        email: 'user@test.com',
      })),
    },
  };
});

describe('auth logout', () => {
  test('logout should return 200', (done) => {
    request(app)
      .get('/v1/authenticate/logout')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        done();
      });
  });
});
