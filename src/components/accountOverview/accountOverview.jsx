import { useSelector } from "react-redux";

export default function AccountOverview() {
  const user = useSelector((state) => state.users.currentUser);

  return (
    <div>
      <h2>{`Welcome, ${user.username || `user`}!`}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
