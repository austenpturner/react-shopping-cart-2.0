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
    <div className="page-container error-page">
      <h1 className="page-header error-page-header">
        Oops, something went wrong...{" "}
      </h1>
      <p className="page-error">{errorMsg}</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
