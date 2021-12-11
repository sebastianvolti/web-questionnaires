import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ReactComponent as DecemberLogoSvg } from '../../assets/icons/december-logo.svg';

import * as appActions from '../../redux/actions/appActions';

import './index.scss';

type Props = {
  surveyId: string,
  getUserData(): any,
  userData: any,
};

const Login: React.FunctionComponent<Props> = ({
  surveyId,
  getUserData,
  userData,
}: Props): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    if (userData && Object.keys(userData).length && userData.data) {
      history.replace(`/questionnaire/${surveyId}`);
    }
  });

  const loginError = () => history.replace(`/login/${surveyId}`);

  const receiveMessage = (event:any) => {
    window.removeEventListener('message', receiveMessage);

    return (event.data === 'success' ? getUserData() : loginError());
  };

  const handleGoogleSign = () => {
    const url = `${process.env.REACT_APP_API_URL}/v1/authenticate/google`;
    const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
    let windowObjectReference:any = null;
    let previousUrl = null;

    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, '', strWindowFeatures);
    } else if (previousUrl !== url) {
      windowObjectReference = window.open(url, '', strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }
    window.addEventListener('message', receiveMessage);
    previousUrl = url;
  };

  return (
    <div className="login">
      <div className="login__vector" />

      <div className="login__image-container">
        <DecemberLogoSvg />
      </div>

      <div className="login__title">Welcome!</div>

      <p className="login__body">
        Thank you for agreeing to complete this short survey!
        Your responses will help us understand users better and deliver high-quality products.
      </p>

      <button className="login__button" type="button" onClick={() => handleGoogleSign()}>
        <FontAwesomeIcon
          icon={faGoogle}
          color="#fff"
          className="login__icon"
        />
        Continue with Google
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userData: state.appReducer.toJS().userData,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    getUserData,
  } = bindActionCreators(appActions, dispatch);

  return {
    getUserData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
