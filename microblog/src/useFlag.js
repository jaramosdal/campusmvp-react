import { useState } from "react";

export const useFlag = (valorDefecto = false) => {
  const [valor, setValor] = useState(valorDefecto);
  return [valor, () => setValor(true), () => setValor(false)];
};
