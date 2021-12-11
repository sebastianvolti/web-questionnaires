import React from 'react';
import { ReactComponent as DecemberLogoSvg } from '../../assets/icons/december-logo.svg';

import './index.scss';

const ErrorPage = () => {
  const errorCode = new URLSearchParams(window.location.search).get('status');

  const renderSwitch = (param: any) => {
    switch (param) {
    case '404':
      return (
        <p className="error__body">
          We are sorry to communicate that the page you are trying to access was not found.
          If you think it should be a valid route, please contact our team!
        </p>
      );
    case '409':
      return (
        <p className="error__body">
          The questionnaire you are trying to access has already been completed. Thank you!
        </p>
      );
    default:
      return (
        <p className="error__body">
          An unknown error happened! Please contact our team!
        </p>
      );
    }
  };

  return (
    <div className="error">
      <div className="error__vector" />

      <div className="error__image-container">
        <DecemberLogoSvg />
      </div>
      <div className="error__title">An error has occurred!</div>

      {renderSwitch(errorCode)}
    </div>
  );
};

export default ErrorPage;
