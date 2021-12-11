import React from 'react';
import Activity from './Activity';
import { ReactComponent as ClosedCardSortingSvg } from '../assets/icons/closed-icon.svg';
import ClosedCardSortingComponent from '../components/Activities/ClosedCardSorting';

class ClosedCardSorting implements Activity {
  getType = (): string => 'closed-card-sorting';

  private questionTitle = '';

  private cards: string[] = [];

  private groups: string[] = [];

  private isRequired = false;

  private id = 0;

  private destroy = false;

  getId = (): number => this.id;

  getTitle = (): string => 'Closed Card Sorting';

  getSvgIcon = (): JSX.Element => <ClosedCardSortingSvg />;

  getComponent = (activity?: Activity): JSX.Element => (
    <ClosedCardSortingComponent activity={activity} />
  );

  getQuestion = (): string => this.questionTitle;

  getIsRequired = (): boolean => this.isRequired;

  getDestroyed = (): boolean => this.destroy;

  setId = (newId: number): void => {
    this.id = newId;
  };

  getCard = (): string[] => this.cards.slice();

  getGroup = (): string[] => this.groups.slice();

  setCard = (cards: string[]): void => {
    this.cards = cards;
  }

  setGroup = (groups: string[]): void => {
    this.groups = groups;
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

  addGroup = (group: string): void => {
    this.groups.push(group);
  };

  deleteGroup = (index: number): void => {
    this.groups.splice(index, 1);
  };

  getResultsComponent = (question: any): JSX.Element => <div> ClosedCardSorting results </div>;

  clone = (): ClosedCardSorting => {
    const clon = new ClosedCardSorting();
    Object.assign(clon, {
      isRequired: this.isRequired,
      destroy: this.destroy,
      cards: [...this.cards],
      groups: [...this.groups],
      id: this.id,
      questionTitle: this.questionTitle,
    });
    return clon;
  };
}

export default ClosedCardSorting;
