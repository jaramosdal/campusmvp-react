import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>¡Oh, no!</h1>
      <p>Lo sentimos, ha ocurrido un error inesperado.</p>
      <p>
        Mensaje de error: <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
