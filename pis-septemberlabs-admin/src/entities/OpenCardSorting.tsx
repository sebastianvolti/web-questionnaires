import React from 'react';
import Activity from './Activity';
import { ReactComponent as OpenCardSortingSvg } from '../assets/icons/open-icon.svg';
import OpenCardSortingComponent from '../components/Activities/OpenCardSorting';

class OpenCardSorting implements Activity {
  getType = (): string => 'open-card-sorting';

  private id = 0;

  private questionTitle = '';

  private cards: string[] = [];

  private isRequired = false;

  private destroy = false;

  getTitle = (): string => 'Open Card Sorting';

  getSvgIcon = (): JSX.Element => <OpenCardSortingSvg />;

  getComponent = (activity?: Activity): JSX.Element => (
    <OpenCardSortingComponent activity={activity} />
  );

  getId = (): number => this.id;

  getQuestion = (): string => this.questionTitle;

  getCard = (): string[] => this.cards.slice();

  getIsRequired = (): boolean => this.isRequired;

  getDestroyed = (): boolean => this.destroy;

  setId = (newId: number): void => {
    this.id = newId;
  };

  setCard = (cards: string[]): void => {
    this.cards = cards;
  }

  setQuestion = (newQuestionTitle: string): void => {
    this.questionTitle = newQuestionTitle;
  };

  setIsRequired = (isRequired: boolean): void => {
    this.isRequired = isRequired;
  };

  setDestroyed = (destroy: boolean): void => {
    this.destroy = destroy;
  };

  addCard = (card: string): void => {
    this.cards.push(card);
  };

  deleteCard = (index: number): void => {
    this.cards.splice(index, 1);
  };

  getResultsComponent = (question: any): JSX.Element => <div>OpenCardSorting results</div>;

  clone = (): OpenCardSorting => {
    const clon = new OpenCardSorting();
    Object.assign(clon, {
      isRequired: this.isRequired,
      destroy: this.destroy,
      cards: [...this.cards],
      id: this.id,
      questionTitle: this.questionTitle,
    });
    return clon;
  };
}

export default OpenCardSorting;
