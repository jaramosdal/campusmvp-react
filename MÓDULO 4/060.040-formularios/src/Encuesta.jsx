import { useMemo, useState } from "react";

const Pregunta = ({ texto, ejemplo, ...props }) => {
  return (
    <>
      <p>
        <label>{texto}</label>
      </p>
      <textarea placeholder={ejemplo} {...props} />
    </>
  );
};

const Escala = ({ id, texto, value, maximo, ...props }) => {
  return (
    <>
      <p>{ texto }</p>
      <div className="escala">
        {[...Array(maximo)]
          .map((_, i) => i + 1)
          .map((i) => (
            <label key={i}>
              <input type="radio" value={i} checked={value == i} name={id} {...props} />
              <span className={value >= i ? "checked" : ""}>{i}</span>
            </label>
          ))
        }
      </div>
    </>
  )
}

const Validacion = ({ elemento, validez, mensaje }) => {
  return (
    <div className={validez ? "valida" : "invalida"}>
      {elemento}
      {validez || <div className="mensaje">{mensaje}</div>}
    </div>
  )
}

const Encuesta = () => {
  const [opinion, setOpinion] = useState("")
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [valor, setValor] = useState(0);

  const handleChange = (set) => (e) => {
    set(e.target.value)
  }

  const validaciones = {
    opinion: opinion.length > 50,
    cons: valor > 5 || cons.length > 50,
    valor: valor != 0
  }

  return (
    <form>
      <Validacion
        elemento={<Escala id="global"
          texto="¿Cuál es tu valoración global?"
          value={valor}
          maximo={10}
          onChange={handleChange(setValor)}
          />}
        validez={validaciones.valor}
        mensaje="Indica una valoración"
      />
      <Validacion
        elemento={
          <Pregunta
            texto="Describe tu opinión general acerca del producto"
            ejemplo="Reseña"
            value={opinion}
            onChange={handleChange(setOpinion)}
          />
        }
        validez={validaciones.opinion}
        mensaje="La opinión debe tener al menos 50 caracteres"
      />
      <Pregunta
        texto="¿Cuáles son las ventajas del producto?"
        ejemplo="Calidad de los materiales, velocidad"
        value={pros}
        onChange={handleChange(setPros)}
      />
      <Validacion
        elemento={
          <Pregunta
            texto="¿Qué inconvenientes u obstáculos has encontrado?"
            ejemplo="Dificultad de uso"
            value={cons}
            onChange={handleChange(setCons)}
          />
        }
        validez={validaciones.cons}
        mensaje="Indica el motivo de tu valoración (mínimo 50 caracteres)"
      />
      <p>
        <button type="submit" 
          disabled={Object.values(validaciones).some((v) => !v)}>Enviar reseña</button>
      </p>
    </form>
  );
};

export default Encuesta;
