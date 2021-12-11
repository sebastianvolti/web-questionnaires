import React from 'react';
import './index.scss';

const Finish: React.FunctionComponent= () => {
  return (
    <div className="finish">
      <div className="finish__vector" />

      <div className="finish__image-container">
        <div className="finish__header">
          <div className="finish__logo_vector" />
          <div className="finish__logo_title-container">
            <span>December</span>
            <span>Labs</span>
          </div>
        </div>
      </div>

      <div className="login__title">Thank You!</div>

      <p className="login__body">
        Thank you for agreeing to complete this short survey!
        Your responses will help us understand users better and deliver high-quality products.
      </p>
    </div>
  );
};

export default Finish;
