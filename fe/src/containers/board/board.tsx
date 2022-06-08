import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { listener } from "../../store/api/api";
import { ClientMessageCode, ClientMsg } from "../../types";
import BoardContent from "./boardContent";

let ws: WebSocket;

const Board = () => {
  useEffect(() => {
    ws = new WebSocket("ws://localhost:8085/boxes");

    ws.addEventListener("message", listener);
  }, []);

  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);

  const updateRows = useCallback((event) => {
    setRows(parseInt(event.target.value));
  }, []);

  const updateColumns = useCallback((event) => {
    setColumns(parseInt(event.target.value));
  }, []);

  const handleClick = useCallback(() => {
    const message: ClientMsg = {
      action: ClientMessageCode.generate,
      additional: {
        rows: rows,
        columns: columns,
      },
    };

    ws.send(JSON.stringify(message));
  }, [rows, columns]);

  const [intervalUpdates, setIntervalUpdates] = useState(1000);
  const [boxCountMin, setBoxCountMin] = useState(1);
  const [boxCountMax, setBoxCountMax] = useState(1);

  const updateIntervalUpdates = useCallback((event) => {
    setIntervalUpdates(parseInt(event.target.value));
  }, []);

  const updateBoxCountMin = useCallback((event) => {
    setBoxCountMin(parseInt(event.target.value));
  }, []);

  const updateBoxCountMax = useCallback((event) => {
    setBoxCountMax(parseInt(event.target.value));
  }, []);

  const handleStart = useCallback(() => {
    const message: ClientMsg = {
      action: ClientMessageCode.start,
      additional: {
        intervalUpdate: intervalUpdates,
        updateBoxCountMin: boxCountMax,
        updateBoxCountMax: boxCountMax,
      },
    };

    ws.send(JSON.stringify(message));
  }, [intervalUpdates, boxCountMax, boxCountMin]);

  const handlePause = useCallback(() => {
    const message: ClientMsg = {
      action: ClientMessageCode.pause,
    };

    ws.send(JSON.stringify(message));
  }, []);

  const handleResume = useCallback(() => {
    const message: ClientMsg = {
      action: ClientMessageCode.resume,
    };

    ws.send(JSON.stringify(message));
  }, []);

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleClick}>
          Generate
        </Button>
        <div>
          <label htmlFor="row">Row</label>
          <input id={"row"} type="number" value={rows} onChange={updateRows} />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <input
            id={"columns"}
            type="number"
            value={columns}
            onChange={updateColumns}
          />
        </div>
      </div>
      <span> </span>
      <div style={{ margin: "20px" }}>
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
        <div>
          <label htmlFor="interval">interval</label>
          <input
            id="interval"
            type="text"
            value={intervalUpdates}
            onChange={updateIntervalUpdates}
          />
        </div>
        <div>
          <label htmlFor="boxMin">min</label>
          <input
            id="boxMin"
            type="text"
            value={boxCountMin}
            onChange={updateBoxCountMin}
          />
        </div>
        <div>
          <label htmlFor="boxMax">max</label>
          <input
            id="boxMax"
            type="text"
            value={boxCountMax}
            onChange={updateBoxCountMax}
          />
        </div>
      </div>
      <span> </span>
      <Button variant="contained" onClick={handlePause}>
        Pause
      </Button>
      <span> </span>
      <Button variant="contained" onClick={handleResume}>
        Resume
      </Button>
      <BoardContent />
    </div>
  );
};

export default Board;
