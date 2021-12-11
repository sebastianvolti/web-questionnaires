import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import AdminScreen from './containers/AdminScreen';
import WaitingGoogle from './containers/Login/WaitingGoogle.tsx';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={AdminScreen} />
        <Route exact path="/dashboard" component={AdminScreen} />
        <Route exact path="/questionnaire" component={AdminScreen} />
        <Route exact path="/questionnaire/:id" component={AdminScreen} />
        <Route exact path="/active-surveys" component={AdminScreen} />
        <Route exact path="/closed-surveys" component={AdminScreen} />
        <Route exact path="/all-surveys" component={AdminScreen} />
        <Route exact path="/drafts" component={AdminScreen} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/callback" component={WaitingGoogle} />
        <Route exact path="/results/:id" component={AdminScreen} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
