import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useEffect } from "react";

const Header = () => {
  const { logout, isAuth, loading, authorize } = useAuth();

  useEffect(() => {
    authorize("test");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "80px",
      }}
    >
      <ul
        style={{
          display: "flex",
          gap: "30px",
          margin: "0",
          padding: "0",
          listStyle: "none",
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      {loading && "..."}
      {isAuth && !loading && (
        <Link to="#" onClick={logout}>
          Logout
        </Link>
      )}
    </div>
  );
};

export default Header;
