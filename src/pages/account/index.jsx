import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import Button from "../../components/button";
import useAuth from "../../hooks/useAuth";

export default function AccountPage() {
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const handleLogout = useLogout();

  if (loading) {
    return (
      <div>
        <h1>Account Page</h1>
        <p>Loading... </p>
      </div>
    );
  } else if (!user) {
    return (
      <div>
        <h1>Account Page</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Account Page</h1>
      <p>{`Welcome, ${user.username || `user`}!`}</p>
      <Button text={"logout"} type={"logout"} handleAction={handleLogout} />
    </div>
  );
}
