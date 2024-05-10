import React, { FunctionComponent } from "react";

interface Props {
  value?: string;
  handler: () => void;
}

const Square: FunctionComponent<Props> = ({ value, handler }) => {
  return (
    <button className="square" onClick={handler}>
      {value && value}
    </button>
  );
};

export default Square;
