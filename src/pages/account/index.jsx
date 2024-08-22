import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";

export default function AccountPage() {
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const handleLogout = useLogout();

  function getHeadingText() {
    if (loading) {
      return `Loading... `;
    } else if (!user) {
      return `You are not logged in. Please log in to access your account.`;
    } else {
      return `Welcome, ${user.username || `user`}!`;
    }
  }

  return (
    <div className="page-container account-page">
      <h1 className="page-header account-page-header">Account Page</h1>
      <h2 className="page-subheader account-page-subheader">
        {getHeadingText()}
      </h2>
      {user ? (
        <Button text={"logout"} type={"logout"} handleAction={handleLogout} />
      ) : null}
    </div>
  );
}
