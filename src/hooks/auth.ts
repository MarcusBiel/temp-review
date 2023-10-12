import { useContext } from "react";
import { AuthContext } from "../context/auth";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
