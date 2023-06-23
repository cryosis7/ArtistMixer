import React from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactElement;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export const withAuth = <P extends object>(
  UnauthorisedComponent: React.ComponentType<P>
) => {
  const WithAuth: React.FC<P> = (props) => {
    const token = localStorage.getItem("token");

    return token ? (
      <UnauthorisedComponent {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return WithAuth;
};
