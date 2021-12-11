import React from 'react';
import Activity from './Activity';
import { ReactComponent as TextSvg } from '../assets/icons/text.svg';

import TextAnswerComponent from '../components/Activities/TextAnswer';
import TextResults from '../components/Results/TextResults';

class TextAnswer implements Activity {
  getType = (): string => 'text';

  private id = 0;

  private questionTitle = '';

  private isRequired = false;

  private destroy = false;

  getId = (): number => this.id;

  getTitle = (): string => 'Text Answer';

  getSvgIcon = (): JSX.Element => <TextSvg />;

  getComponent = (activity?: Activity): JSX.Element => <TextAnswerComponent activity={activity} />;

  getQuestion = (): string => this.questionTitle;

  getDestroyed = (): boolean => this.destroy;

  setId = (newId: number): void => {
    this.id = newId;
  };

  setQuestion = (newQuestionTitle: string): void => {
    this.questionTitle = newQuestionTitle;
  };

  setDestroyed = (destroy: boolean): void => {
    this.destroy = destroy;
  };

  getIsRequired = (): boolean => this.isRequired;

  setIsRequired = (isRequired: boolean): void => {
    this.isRequired = isRequired;
  };

  getResultsComponent = (question: any): JSX.Element => <TextResults question={question} />;

  clone = (): TextAnswer => {
    const clon = new TextAnswer();
    Object.assign(clon, {
      isRequired: this.isRequired,
      destroy: this.destroy,
      id: this.id,
      questionTitle: this.questionTitle,
    });
    return clon;
  };
}

export default TextAnswer;
