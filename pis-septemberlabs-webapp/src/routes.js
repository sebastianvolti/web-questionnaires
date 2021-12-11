import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import Login from './containers/Login';
import Questionnaire from './containers/Questionnaire';
import WaitingGoogle from './containers/Login/WaitingGoogle.tsx';
import Finish from './components/Finish'
import ErrorPage from './containers/Error';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          path="/login/:survey"
          render={(props) => <Login surveyId={props.match.params.survey} />}
        />
        <Route
          exact
          path="/questionnaire/:survey"
          render={(props) => (
            <Questionnaire surveyId={props.match.params.survey} />
          )}
        />
        <Route path="/callback" component={WaitingGoogle} />
        <Route path="/finish" component={Finish} />
        <Route path="/error" component={ErrorPage} />
        <Redirect to="/error?status=404" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
