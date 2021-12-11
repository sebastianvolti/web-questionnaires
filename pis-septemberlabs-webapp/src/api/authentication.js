import baseClient from './base';

export const getUserData = () => baseClient.get('/v1/authenticate/user')
  .then(({ data }) => data);

export const userLogout = () => baseClient.get('/v1/authenticate/logout')
  .then(({ data }) => data);
