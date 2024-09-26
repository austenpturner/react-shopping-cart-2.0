import { useSelector } from "react-redux";
import Button from "../button";

export default function AccountOverview() {
  const user = useSelector((state) => state.users.currentUser);

  return (
    <div>
      <h2>{`Welcome, ${user.username || `user`}!`}</h2>
      <p>email: {user.email}</p>
      <p>username: {user.username}</p>
      <Button text="update username" />
    </div>
  );
}
