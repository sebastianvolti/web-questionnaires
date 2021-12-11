import { QueryInterface } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      'QuestionTypes',
      [
        {
          name: 'MultipleSelection',
          inputSchema: JSON.stringify({
            type: 'object',
            properties: {
              options: {
                type: 'array',
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: 'string',
                },
              },
            },
            required: ['options'],
            additionalProperties: false,
          }),
          outputSchema: JSON.stringify({
            type: 'object',
            properties: {
              selected: {
                type: 'array',
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: 'number',
                },
              },
            },
            required: ['selected'],
            additionalProperties: false,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'SimpleSelection',
          inputSchema: JSON.stringify({
            type: 'object',
            properties: {
              options: {
                type: 'array',
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: 'string',
                },
              },
            },
            required: ['options'],
            additionalProperties: false,
          }),
          outputSchema: JSON.stringify({
            type: 'object',
            properties: {
              selected: {
                type: 'array',
                minItems: 1,
                maxItems: 1,
                uniqueItems: true,
                items: {
                  type: 'number',
                },
              },
            },
            required: ['selected'],
            additionalProperties: false,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Text',
          inputSchema: JSON.stringify({}),
          outputSchema: JSON.stringify({
            type: 'object',
            properties: {
              text: {
                type: 'string',
              },
            },
            required: ['text'],
            additionalProperties: false,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ranking',
          inputSchema: JSON.stringify({}),
          outputSchema: JSON.stringify({
            type: 'object',
            properties: {
              rank: {
                type: 'number',
                minimum: 1,
                maximum: 5,
              },
            },
            required: ['rank'],
            additionalProperties: false,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Closed Card Sorting',
          inputSchema: JSON.stringify({
            type: 'object',
            properties: {
              categories: {
                type: 'array',
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: 'string',
                },
              },
              items: {
                type: 'array',
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: 'string',
                },
              },
            },
            required: ['categories', 'items'],
            additionalProperties: false,
          }),
          outputSchema: JSON.stringify({
            type: 'object',
            patternProperties: {
              '^.*$': {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            additionalProperties: false,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Open Card Sorting',
          inputSchema: JSON.stringify({
            type: 'object',
            properties: {
              items: {
                type: 'array',
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: 'string',
                },
              },
            },
            required: ['items'],
            additionalProperties: false,
          }),
          outputSchema: JSON.stringify({
            type: 'object',
            patternProperties: {
              '^.*$': {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                  },
                  cards: {
                    type: 'array',
                    uniqueItems: true,
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['title', 'cards'],
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(
      'QuestionTypes',
      {
        name: [
          'MultipleSelection',
          'SimpleSelection',
          'Text',
          'Ranking',
          'Closed Card Sorting',
          'Open Card Sorting',
        ],
      },
      {}
    );
  },
};
