import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/auth";

const HomePage = () => {
  const { isAuth, loading } = useAuth();

  return (
    <div>
      <h2>Home</h2>
      {!isAuth && !loading && <LoginForm />}
    </div>
  );
};

export default HomePage;
