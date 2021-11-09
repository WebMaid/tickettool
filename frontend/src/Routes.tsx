import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCurrentUserQuery } from "./generated/graphql";
import ProtectedRoute, { ProtectedRouteProps } from "./helpers/ProtectedRoute";
import {
  DepartmentIndexPage,
  HomePage,
  NotFoundPage,
  RoleIndexPage,
  ServiceCreatePage,
  ServiceDetailPage,
  ServiceIndexPage,
  SettingIndexPage,
  TicketCreatePage,
  TicketDetailPage,
  TicketIndexPage,
  TicketTemplateCreatePage,
  TicketTemplateDetailPage,
  TicketTemplateIndexPage,
  UserCreatePage,
  UserDetailPage,
  UserLoginPage,
  UserSettingIndexPage,
  UserSettingTokenIndexPage,
  UserSettingTokenCreatePage,
  UserSettingTokenDetailPage,
} from "./pages";

export const Routing: React.FC = () => {
  const { data, loading } = useCurrentUserQuery();
  const user = data?.currentUser;

  if (loading) return <div>loading...</div>;

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: user != null,
    authenticationPath: "/login",
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/profile/:username" element={<UserDetailPage />} />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/user/settings"
            element={<UserSettingIndexPage />}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/user/settings/tokens"
            element={<UserSettingTokenIndexPage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/user/settings/token/create"
            element={<UserSettingTokenCreatePage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/user/settings/token/:id"
            element={<UserSettingTokenDetailPage />}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/settings"
            element={<SettingIndexPage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/departments"
            element={<DepartmentIndexPage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/roles"
            element={<RoleIndexPage />}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/ticket-templates"
            element={<TicketTemplateIndexPage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/ticket-template/create"
            element={<TicketTemplateCreatePage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/ticket-template/:id"
            element={<TicketTemplateDetailPage />}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/user/create"
            element={<UserCreatePage />}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/tickets"
            element={<TicketIndexPage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/ticket/create"
            element={<TicketCreatePage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/ticket/:id"
            element={<TicketDetailPage />}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/services"
            element={<ServiceIndexPage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/service/create"
            element={<ServiceCreatePage />}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path="/service/:id"
            element={<ServiceDetailPage />}
          />

          <Route path="/" element={<HomePage />} />
          <Route path="" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
