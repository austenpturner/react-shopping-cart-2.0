// import { useSelector } from "react-redux";
// import { logout } from "../../store/slices/users-slice";

export default function AccountPage() {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  function handleLogout() {
    // dispatch(logout());
    console.log("logout requested");
  }

  return (
    <div>
      <h1>{`Welcome`}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
