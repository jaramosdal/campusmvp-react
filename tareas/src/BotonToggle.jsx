import { useState } from "react";

const BotonToggle = ({ title }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <button onClick={handleClick}>
      {title} {checked ? "DONE" : "TODO"}
    </button>
  );
};

export default BotonToggle;
