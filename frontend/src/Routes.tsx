import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { DepartmentIndexPage, HomePage, NotFoundPage, RoleIndexPage, ServiceCreatePage, ServiceDetailPage, ServiceIndexPage, SettingIndexPage, TicketCreatePage, TicketDetailPage, TicketIndexPage, TicketTemplateCreatePage, TicketTemplateDetailPage, TicketTemplateIndexPage, UserCreatePage, UserDetailPage, UserLoginPage, UserSettingIndexPage, UserSettingsDeveloperPage } from './pages';
import ProtectedRoute, { ProtectedRouteProps } from './helpers/ProtectedRoute';
import { useCurrentUserQuery } from './generated/graphql';

export const Routes: React.FC = () => {
  const { data, loading } = useCurrentUserQuery()
  const user = data?.currentUser;

  if (loading)
    return (<div>loading...</div>)

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: user != null,
    authenticationPath: '/login'
  };

return (<BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/home" component={HomePage} />

        <Route exact path="/login" component={UserLoginPage} />
        <Route exact path="/profile/:username" component={UserDetailPage}/>

        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/user/settings" component={UserSettingIndexPage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/user/settings/development" component={UserSettingsDeveloperPage}/>

        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/settings" component={SettingIndexPage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/departments" component={DepartmentIndexPage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/roles" component={RoleIndexPage}/>

        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/ticket-templates" component={TicketTemplateIndexPage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/ticket-template/create" component={TicketTemplateCreatePage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/ticket-template/:id" component={TicketTemplateDetailPage}/>
        
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/user/create" component={UserCreatePage}/>


        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/tickets" component={TicketIndexPage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/ticket/create" component={TicketCreatePage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/ticket/:id" component={TicketDetailPage}/>


        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/services" component={ServiceIndexPage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/service/create" component={ServiceCreatePage}/>
        <ProtectedRoute {...defaultProtectedRouteProps} exact path="/service/:id" component={ServiceDetailPage}/>


        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>)
}
