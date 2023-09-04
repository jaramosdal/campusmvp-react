import { useRef } from "react";
import { Form } from "react-router-dom";

// routes/vote.jsx
export default function Vote() {
  const boton = useRef();

  return (
    <div className="cta">
      <p>¿Es tu favorita? Vótala:</p>
      <Form
        method="post"
        onSubmit={() => (boton.current.disabled = "disabled")}
      >
        <button ref={boton} type="submit">
          Votar
        </button>
      </Form>
    </div>
  );
}
