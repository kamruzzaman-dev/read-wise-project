// import { userRole } from "../config/USER_ROLE";
// import { Navigate, useLocation } from "react-router-dom";
// import { useGetLoginUserQuery } from "../service/userApi";
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  user: "user"
}

export const PrivateRoute = ({ children }: IProps) => {
  // let location = useLocation();
  // const { data } = useGetLoginUserQuery();

  // const userHasRequiredRole =
  //   data?.data && roles.includes(data?.data?.role) ? true : false;

  // if (data?.data?.role === userRole.USER) {
  //   return <Navigate to="/dashboard" state={{ from: location }} />;
  // }

  // if (data?.data?.role === userRole.USER && !userHasRequiredRole) {
  //   return <h3>Access Denied</h3>;
  // }

  return children;
};
