import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ReactComponent as LogoLogin } from '../../assets/icons/logoLogin.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google-icon.svg';

import * as appActions from '../../redux/actions/appActions';

import './index.scss';

type Props = {
  history: any,
  userData: any,
  getUserData(): any;
}

const Login: React.FunctionComponent<Props> = ({
  history,
  userData,
  getUserData,
}: Props): JSX.Element => {
  useEffect(() => {
    if (userData && Object.keys(userData).length) {
      history.replace('/');
    }
  }, [userData, history]);

  const loginError = () => window.location.replace(process.env.REACT_APP_ADMIN_URL || '');

  const receiveMessage = (event:any) => {
    window.removeEventListener('message', receiveMessage);
    return (event.data === 'success' ? getUserData() : loginError());
  };

  const handleGoogleSign = () => {
    const url = `${process.env.REACT_APP_API_URL}/v1/authenticate/admin/google`;
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
      <div className="login__content">
        <div className="login__header">
          <LogoLogin />
        </div>
        <div className="login__title">LOG IN TO YOUR ACCOUNT</div>
        <button className="login__button" type="button" onClick={handleGoogleSign}>
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
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
