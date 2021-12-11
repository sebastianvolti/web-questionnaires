export const InstructionText1 = 'Take a quick look at the list of items above. We\'d like you to sort them into groups that make sense to you. Drag a card into this space to form a group.';
export const InstructionText2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque nec non neque, mattis a. Faucibus odio erat in ac. Accumsan diam at molestie blandit tellus gravida sagittis euismod. ';

export const SimpleChoiceActivityToDo = {
  id: 0,
  questionTypeId: 2,
  surveyId: 1,
  description: 'Example Simple Question Title',
  required: false,
  parameters: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ],
  },
};

export const MultipleChoiceActivityToDo = {
  id: 1,
  questionTypeId: 3,
  surveyId: 1,
  description: 'Example Multiple Question Title',
  required: false,
  parameters: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ],
    minimumOptions: 2,
  },
};

export const TextActivityToDo = {
  id: 2,
  questionTypeId: 1,
  surveyId: 1,
  description: 'Describe your company in no more than 100 characters',
  required: false,
  parameters: {
  },
};

export const RatingActivityToDo = {
  id: 3,
  questionTypeId: 4,
  surveyId: 1,
  description: 'How would you rate your current design',
  required: false,
  parameters: {
  },
};

export const SimpleChoiceActivityInProgress = {
  id: 0,
  questionTypeId: 2,
  surveyId: 1,
  description: 'Example Simple Question Title',
  required: false,
  parameters: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ],
  },
  answers: {
    id: 1,
    participationId: 1,
    questionId: 1,
    answer: {
      selected: [3],
    },
  },
};

export const MultipleChoiceActivityInProgress = {
  id: 1,
  questionTypeId: 3,
  surveyId: 1,
  description: 'Example Multiple Question Title',
  required: false,
  parameters: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ],
    minimumOptions: 2,
  },
  answers: {
    id: 1,
    participationId: 1,
    questionId: 1,
    answer: {
      selected: [1, 2],
    },
  },
};

export const TextActivityInProgress = {
  id: 2,
  questionTypeId: 1,
  surveyId: 1,
  description: 'Describe your company in no more than 100 characters',
  required: false,
  parameters: {
  },
  answers: {
    id: 2,
    participationId: 1,
    questionId: 2,
    answer: {
      text: 'The best place to work',
    },
  },
};

export const RatingActivityInProgress = {
  id: 3,
  questionTypeId: 4,
  surveyId: 1,
  description: 'How would you rate your current design',
  required: false,
  parameters: {
  },
  answers: {
    id: 3,
    participationId: 1,
    questionId: 3,
    answer: {
      rank: 4,
    },
  },
};
export const TextActivityInProgressAlfa = {
  id: 4,
  questionTypeId: 1,
  surveyId: 1,
  description: 'What is your role in your company?',
  required: false,
  parameters: {
  },
};

export const TextActivityInProgressBeta = {
  id: 5,
  questionTypeId: 1,
  surveyId: 1,
  description: 'Do you like sports?',
  required: false,
  parameters: {
  },
};

export const questionnaireToDoData = {
  id: 0,
  title: 'Example Questionnaire Title',
  projectName: 'Project Name',
  lastAnswer: 0,
  questions: [
    SimpleChoiceActivityToDo,
    MultipleChoiceActivityToDo,
    TextActivityToDo,
    RatingActivityToDo,
  ],
};

export const questionnaireInProgressData = {
  id: 0,
  title: 'Example Questionnaire Title',
  projectName: 'Project Name',
  lastAnswer: 4,
  questions: [
    SimpleChoiceActivityInProgress,
    MultipleChoiceActivityInProgress,
    TextActivityInProgress,
    RatingActivityInProgress,
    TextActivityInProgressAlfa,
    TextActivityInProgressBeta,
  ],
};

export const questionnaireInProgress = {
  success: true,
  data: questionnaireInProgressData,
};

export const questionnaireToDo = {
  success: true,
  data: questionnaireToDoData,
};
