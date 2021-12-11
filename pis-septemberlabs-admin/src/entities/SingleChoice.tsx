import React from 'react';
import Activity from './Activity';
import { ReactComponent as SingleChoiceSvg } from '../assets/icons/single-choice.svg';
import SingleChoiceComponent from '../components/Activities/SingleChoice';
import SingleChoiceResults from '../components/Results/SingleChoiceResults';

class SingleChoice implements Activity {
  private id = 0;

  private question = '';

  private answers: string[] = [];

  private isRequired = false;

  private destroy = false;

  getId = (): number => this.id;

  getType = (): string => 'single-choice';

  getTitle = (): string => 'Single Choice';

  getSvgIcon = (): JSX.Element => <SingleChoiceSvg />;

  getComponent = (activity?: Activity): JSX.Element => (
    <SingleChoiceComponent activity={activity} />
  );

  getQuestion = (): string => this.question;

  getAnswer = (): string[] => this.answers.slice();

  getIsRequired = (): boolean => this.isRequired;

  getDestroyed = (): boolean => this.destroy;

  setId = (newId: number): void => {
    this.id = newId;
  };

  setQuestion = (newQuestion: string): void => {
    this.question = newQuestion;
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

  getResultsComponent = (question: any): JSX.Element => <SingleChoiceResults question={question} />;

  clone = (): SingleChoice => {
    const clon = new SingleChoice();
    Object.assign(clon, {
      isRequired: this.isRequired,
      destroy: this.destroy,
      id: this.id,
      question: this.question,
      answers: [...this.answers],
    });
    return clon;
  };
}

export default SingleChoice;
