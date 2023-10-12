import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

type Props = {
  children: ReactNode;
};

const RequireAuth: FunctionComponent<Props> = ({ children }) => {
  const location = useLocation();
  const { isAuth, loading } = useAuth();
  const [componentDidMount, setComponentDidMount] = useState(false);

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  if (!componentDidMount || loading) return null;

  if (!isAuth) return <Navigate to="/" state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;
