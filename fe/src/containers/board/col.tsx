import React, { FC } from "react";
import { Row } from "../../types";
import Cel from "./cel";

interface Props {
  row: Row;
}

const Col: FC<Props> = ({ row }) => {
  return (
    <div>
      <div key={row.id} className={"col"}>
        {row.columns.map((cel) => {
          return <Cel cel={cel} />;
        })}
      </div>
    </div>
  );
};

export default Col;
