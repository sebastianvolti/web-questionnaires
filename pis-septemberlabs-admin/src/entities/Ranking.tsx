import React from 'react';
import Activity from './Activity';
import { ReactComponent as RankingSvg } from '../assets/icons/ranking.svg';

import RankingComponent from '../components/Activities/Ranking';
import RankingResults from '../components/Results/RankingResults';

class Ranking implements Activity {
  getType = (): string => 'ranking';

  private id = 0;

  private questionTitle = '';

  private isRequired = false;

  private destroy = false;

  getId = (): number => this.id;

  getTitle = (): string => 'Ranking';

  getSvgIcon = (): JSX.Element => <RankingSvg />;

  getComponent = (activity?: Activity): JSX.Element => <RankingComponent activity={activity} />;

  getQuestion = (): string => this.questionTitle;

  setQuestion = (newQuestionTitle: string): void => {
    this.questionTitle = newQuestionTitle;
  };

  getIsRequired = (): boolean => this.isRequired;

  getDestroyed = (): boolean => this.destroy;

  setId = (newId: number): void => {
    this.id = newId;
  };

  setIsRequired = (isRequired: boolean): void => {
    this.isRequired = isRequired;
  };

  setDestroyed = (destroy: boolean): void => {
    this.destroy = destroy;
  };

  getResultsComponent = (question: any) => <RankingResults question={question} />;

  clone = (): Ranking => {
    const clon = new Ranking();
    Object.assign(clon, {
      isRequired: this.isRequired,
      destroy: this.destroy,
      id: this.id,
      questionTitle: this.questionTitle,
    });
    return clon;
  };
}

export default Ranking;
