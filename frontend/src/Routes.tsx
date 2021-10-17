import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HomePage, NotFoundPage, UserLoginPage } from './pages';
import ProtectedRoute, { ProtectedRouteProps } from './helpers/ProtectedRoute';

export const Routes: React.FC = () => {
  /*const { data, loading } = useCurrentUserQuery()
  const user = data?.currentUser;

  if (loading)
    return (<div>loading...</div>)
*/
const user = null;
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: user != null,
    authenticationPath: '/login'
  };

return (<BrowserRouter>
    <div>
      <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/login" component={UserLoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>)
}
