import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { getImageData } from "../gallery";

// routes/photo.jsx
export async function loader({ params }) {
  const data = await getImageData(params.imageId);
  return data;
}

export default function Photo() {
  const { id, url, title, author, votes } = useLoaderData();

  const navigation = useNavigation();
  // Si estamos yendo a una página fuera de esta fotografía, mostraremos el filtro de carga
  const goingBack =
    navigation.state === "loading" &&
    !navigation.location.pathname.includes(id);

  const showVotes = navigation.formData ? votes + 1 : votes;

  return (
    <figure className={goingBack ? "loading" : ""}>
      <figcaption>
        <p>
          <em>{title}</em> por <strong>{author}</strong>
        </p>
        <p className="pill">
          <span>Votos</span>
          <span>{showVotes}</span>
        </p>
      </figcaption>

      <img src={url} />
      <Outlet />
    </figure>
  );
}
