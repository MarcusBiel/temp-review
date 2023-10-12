import { FormEvent } from "react";
import { useAuth } from "../../hooks/auth";
import { SignInPayload } from "../../context/auth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    signIn(payload as SignInPayload, (e) => {
      if (e) return;
      navigate(from, { replace: true });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="username..." />
      <input name="password" type="password" placeholder="password..." />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
