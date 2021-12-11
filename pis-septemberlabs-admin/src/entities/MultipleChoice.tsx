import React from 'react';
import Activity from './Activity';
import { ReactComponent as MultipleChoiceSvg } from '../assets/icons/multiple-choice.svg';
import MultipleChoiceComponent from '../components/Activities/MultipleChoice';
import MultipleChoiceResults from '../components/Results/MultipleChoiceResults';

class MultipleChoice implements Activity {
  private id = 0;

  private question = '';

  private answers: string[] = [];

  private isRequired = false;

  private destroy = false;

  getType = (): string => 'multiple-choice';

  getTitle = (): string => 'Multiple Choice';

  getSvgIcon = (): JSX.Element => <MultipleChoiceSvg />;

  getComponent = (activity?: Activity): JSX.Element => (
    <MultipleChoiceComponent activity={activity} />
  );

  getId = (): number => this.id;

  getQuestion = (): string => this.question;

  getAnswer = (): string[] => this.answers.slice();

  getIsRequired = (): boolean => this.isRequired;

  getDestroyed = (): boolean => this.destroy;

  setQuestion = (newQuestion: string): void => {
    this.question = newQuestion;
  };

  setId = (newId: number): void => {
    this.id = newId;
  };

  setAnswer = (newOptions: string[]): void => {
    this.answers = newOptions;
  };

  setIsRequired = (isRequired: boolean): void => {
    this.isRequired = isRequired;
  };

  setDestroyed = (destroy: boolean): void => {
    this.destroy = destroy;
  };

  addAnswer = (answer: string): void => {
    this.answers.push(answer);
  };

  deleteAnswer = (index: number): void => {
    this.answers.splice(index, 1);
  };

  getResultsComponent = (question: any): JSX.Element => (
    <MultipleChoiceResults question={question} />
  );

  clone = (): MultipleChoice => {
    const clon = new MultipleChoice();
    Object.assign(clon, {
      isRequired: this.isRequired,
      destroy: this.destroy,
      answers: [...this.answers],
      id: this.id,
      question: this.question,
    });
    return clon;
  }
}

export default MultipleChoice;
