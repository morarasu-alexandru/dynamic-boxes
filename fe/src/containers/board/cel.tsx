import React, { FC } from "react";
import { Column } from "../../types";

interface Props {
  cel: Column;
}

const Cel: FC<Props> = ({ cel }) => {
  return (
    <div
      key={cel.id}
      className={"cel"}
      style={{ backgroundColor: cel.value }}
    ></div>
  );
};

export default Cel;
