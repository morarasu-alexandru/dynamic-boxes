import React from "react";
import { useAppSelector } from "../../store/useAppSelector";
import { selectTable } from "../../store/slices/board";

import "./boardContent.scss";
import Col from "./col";

const BoardContent = () => {
  const tableState = useAppSelector(selectTable);

  if (tableState.rows.length === 0) {
    return null;
  }

  return (
    <div className={"table"}>
      {tableState.rows.map((row) => {
        return <Col row={row} />;
      })}
    </div>
  );
};

export default BoardContent;
