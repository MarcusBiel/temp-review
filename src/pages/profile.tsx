import { useAuth } from "../hooks/auth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>Hi, {user?.username}</p>
    </div>
  );
};

export default ProfilePage;
