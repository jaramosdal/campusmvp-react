import { useRef } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { sendVote } from "../gallery";

export async function action({ params }) {
  await sendVote(params.imageId);
  return redirect(`/photos/${params.imageId}/voted`);
}

export default function Vote() {
  const navigation = useNavigation();
  const boton = useRef();

  return (
    <div className="cta">
      <h3>Vote</h3>
      <p>¿Es tu favorita? Vótala:</p>
      <Form
        method="post"
        onSubmit={() => (boton.current.disabled = "disabled")}
      >
        <button
          ref={boton}
          type="submit"
          className={navigation.state !== "idle" ? "sending" : ""}
        >
          Votar
        </button>
      </Form>
    </div>
  );
}
