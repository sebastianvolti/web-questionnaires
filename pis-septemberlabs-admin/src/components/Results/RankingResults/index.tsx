import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

type Props = {
  question: any;
};

const RankingResults: React.FunctionComponent<Props> = ({ question }: Props): JSX.Element => {
  const average = question.answerData.average ? question.answerData.average : 0;

  return (
    <div className="ranking-result-container">
      <div className="ranking-result-average">
        <div className="ranking-result-average-value">{`${average} Stars`}</div>
        <div className="ranking-result-average-stars">
          <StarRatingComponent
            name="rating"
            value={average || -1}
            starCount={5}
            renderStarIcon={(index, value) => {
              let starPercentage = '0%';
              const integerAverage = Math.floor(value);
              const decimalPart = value % 1; // this line extracts the decimal part of the average
              if (index <= integerAverage) {
                starPercentage = '100%';
              } else if (index === integerAverage + 1) {
                // this is the star that needs to be partially filled
                starPercentage = `${decimalPart * 100}%`;
              }

              return (
                <div className="ranking-question__star">
                  <i className="star star-under">
                    <FontAwesomeIcon icon={regularStar} />
                    <i className="star star-over" style={{ width: starPercentage }}>
                      <FontAwesomeIcon icon={solidStar} />
                    </i>
                  </i>
                </div>
              );
            }}
          />
        </div>
      </div>
      <div className="ranking-result-summary">
        <div className="ranking-result-item">
          <div className="ranking-result-star">
            {'1 '}
            <FontAwesomeIcon className="fixed-star" icon={solidStar} />
          </div>
          <div className="ranking-result-star-value">
            {`${question.answerData[1]} `}
            Answers
          </div>
        </div>
        <div className="ranking-result-item">
          <div className="ranking-result-star">
            {'4 '}
            <FontAwesomeIcon className="fixed-star" icon={solidStar} />
          </div>
          <div className="ranking-result-star-value">
            {`${question.answerData[4]} `}
            Answers
          </div>
        </div>
        <div className="ranking-result-item">
          <div className="ranking-result-star">
            {'2 '}
            <FontAwesomeIcon className="fixed-star" icon={solidStar} />
          </div>
          <div className="ranking-result-star-value">
            {`${question.answerData[2]} `}
            Answers
          </div>
        </div>
        <div className="ranking-result-item">
          <div className="ranking-result-star">
            {'5 '}
            <FontAwesomeIcon className="fixed-star" icon={solidStar} />
          </div>
          <div className="ranking-result-star-value">
            {`${question.answerData[5]} `}
            Answers
          </div>
        </div>
        <div className="ranking-result-item">
          <div className="ranking-result-star">
            {'3 '}
            <FontAwesomeIcon className="fixed-star" icon={solidStar} />
          </div>
          <div className="ranking-result-star-value">
            {`${question.answerData[3]} `}
            Answers
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingResults;
