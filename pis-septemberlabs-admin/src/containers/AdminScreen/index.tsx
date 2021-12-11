import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sidebar from '../../components/Sidebar';
import Questionnaire from '../Questionnaire';
import AllSurveys from '../AllSurveys';
import Drafts from '../Drafts';
import ClosedSurveys from '../ClosedSurveys';
import ActiveSurveys from '../ActiveSurveys';
import Dashboard from '../Dashboard';
import ShowResults from '../ShowResults';

import * as appActions from '../../redux/actions/appActions';

import './index.scss';

type Props = {
  userData?: any | null;
  userDataError?: string | null;
  getUserData(): any;
  signOutUser(): any;
};

const AdminScreen: React.FunctionComponent<Props> = ({
  userData,
  userDataError,
  getUserData,
  signOutUser,
}: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // initial state
  useEffect(() => {
    if (!userData || !Object.keys(userData).length) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userData, getUserData, setLoading]);

  // handle logout and success of get user
  useEffect(() => {
    if (!Object.keys(userData).length && !loading) {
      history.replace('/login');
    } else if (Object.keys(userData).length && loading) {
      setLoading(false);
    }
  }, [userData, setLoading, history, loading]);

  useEffect(() => {
    if (userDataError && userDataError.includes('401')) {
      history.replace('/login');
    }
  }, [userDataError, history]);

  if (!userData || loading) return <> </>;

  return (
    <Router>
      <div>
        <Sidebar
          username={
            userData && Object.keys(userData).length
              ? `${userData.name} ${userData.lastName}`
              : 'Unregistered User'
          }
          logOutFunction={signOutUser}
        />
        <div className="admin-container">
          <Route exact path="/questionnaire" component={Questionnaire} />
          <Route path="/questionnaire/:id" component={Questionnaire} />
          <Route exact path="/all-surveys" component={AllSurveys} />
          <Route exact path="/drafts" component={Drafts} />
          <Route exact path="/closed-surveys" component={ClosedSurveys} />
          <Route exact path="/active-surveys" component={ActiveSurveys} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/results/:id" component={ShowResults} />
          <Route exact path="/" component={Dashboard} />
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state: any) => ({
  userData: state.appReducer.toJS().userData,
  userDataError: state.appReducer.toJS().userDataError,
});

const mapDispatchToProps = (dispatch: any) => {
  const { getUserData, signOutUser } = bindActionCreators(appActions, dispatch);

  return {
    getUserData,
    signOutUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
