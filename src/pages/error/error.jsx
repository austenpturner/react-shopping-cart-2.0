import { useEffect, useState } from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const [errorMsg, setErrorMsg] = useState(null);
  const error = useRouteError();
  console.log(error);

  function handleErrorTypes() {
    switch (error.status) {
      case 404:
        setErrorMsg("This page does not exist");
        break;
      default:
        setErrorMsg(error.statusText);
        break;
    }
  }

  useEffect(() => {
    handleErrorTypes();
  }, []);

  return (
    <div>
      <h1>Oops, something went wrong... </h1>
      <p>{errorMsg}</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
