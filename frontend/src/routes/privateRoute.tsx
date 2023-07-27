import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/localStorage.ts';

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const user = JSON.parse(getFromLocalStorage('user_Information')!);

  const { pathname } = useLocation();

  if (!user?.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;
