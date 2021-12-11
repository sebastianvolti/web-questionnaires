const SimpleChoiceMockActivity = {
  id: 10,
  type: 'simplechoice',
  required: true,
  question: {
    id: 101,
    label: 'Fake title',
    options: ['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F'],
  },
  answer: {
    id: 102,
    text: 'answer text',
    choice: [1],
  },
};

export default SimpleChoiceMockActivity;
