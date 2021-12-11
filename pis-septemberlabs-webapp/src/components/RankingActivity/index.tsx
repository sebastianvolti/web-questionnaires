import React from 'react';

import './index.scss';

import StarRatingComponent from 'react-star-rating-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

type Props = {
  label: string;
  answer: any;
  setAnswer(value: number): void;
  validate(isValid: boolean): void;
};

const RankingActivity: React.FunctionComponent<Props> = ({
  label,
  answer,
  setAnswer,
  validate,
}: Props): JSX.Element => (
  <div className="ranking-question">
    <h1 className="ranking-question__title">{label}</h1>

    <div className="ranking-question__stars">
      <StarRatingComponent
        name="rating"
        value={answer || -1}
        starCount={5}
        onStarClick={(nextValue) => {
          const value = nextValue === answer ? -1 : nextValue;
          setAnswer(value);
          validate(value !== -1);
        }}
        renderStarIcon={(index, value) => (
          <div className="ranking-question__star">
            <FontAwesomeIcon
              icon={index <= value ? solidStar : regularStar}
              color="#45adfb"
            />
          </div>
        )}
      />
    </div>
  </div>
);

export default RankingActivity;
