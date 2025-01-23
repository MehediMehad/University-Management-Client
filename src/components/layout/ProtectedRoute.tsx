import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
