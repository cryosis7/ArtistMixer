import React from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactElement;
}

/**
 * DEPRECATED: Use the HoC withAuth(component)
 * @param param0
 * @returns
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export const withAuth = <P extends object>(
  UnauthorisedComponent: React.ComponentType<P & { token?: string }>
) => {
  const WithAuth: React.FC<P> = (props) => {
    const token = localStorage.getItem("token");

    return token ? (
      <UnauthorisedComponent {...props} token={token} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return WithAuth;
};
