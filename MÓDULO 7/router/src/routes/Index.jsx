import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { getImageIds } from "../gallery";

export async function loader() {
  const images = await getImageIds();
  return images;
}

export default function Index() {
  // datos de ejemplo
  const images = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <p className="content">
        Haz clic en cada imagen para ver más detalles y votar por ella.
      </p>
      <div
        id="gallery"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        {images.map((id) => (
          <Link key={id} to={`photos/${id}`}>
            <img src="{`/images/${id}.jpg`}/" />
          </Link>
        ))}
      </div>
    </>
  );
}
