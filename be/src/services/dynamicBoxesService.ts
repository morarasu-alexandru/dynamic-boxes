import { SocketStream } from "fastify-websocket";
import { updateBoxesInterval } from "./dyanmicBoxesInterval";
import { generateTable } from "./dynamicBoxesUtils";
import {
  BoxIntervalConfig,
  ClientMessageCode,
  ClientMsg,
  ConfigBoard,
  DynamicTableColors,
  ServerMessageCode,
  ServerMsg,
  StartConfig,
} from "../../../fe/src/types";

export const dynamicBoxesService = (
  connection: SocketStream /* SocketStream */,
  req /* FastifyRequest */
) => {
  const { socket } = connection;
  let timeIntervalRef: NodeJS.Timeout | null = null;
  let board: DynamicTableColors | null = null;
  let boxIntervalConfig: BoxIntervalConfig | null = null;

  connection.socket.on("message", (message: string) => {
    const clientMsg: ClientMsg = JSON.parse(message);
    const { action } = clientMsg;
    console.log("parsedMessage: ", clientMsg);

    switch (action) {
      case ClientMessageCode.generate: {
        const configBoard = clientMsg.additional as ConfigBoard;
        if (configBoard) {
          var rows = configBoard.rows;
          var columns = configBoard.columns;
        }

        rows = rows === undefined ? 10 : rows;
        columns = columns === undefined ? 10 : columns;

        board = generateTable(rows, columns);
        socket.send(
          JSON.stringify({
            action: ServerMessageCode.generate,
            data: board,
            message: "Generated board",
          } as ServerMsg<DynamicTableColors>)
        );
        break;
      }
      case ClientMessageCode.start: {
        const startConfig = clientMsg.additional as StartConfig;

        boxIntervalConfig = {
          intervalUpdate: startConfig.intervalUpdate || 1000,
          updateBoxCountMin: startConfig.updateBoxCountMin || 1,
          updateBoxCountMax: startConfig.updateBoxCountMax || 2,
        };

        if (timeIntervalRef) {
          clearInterval(timeIntervalRef);
        }

        socket.send(
          JSON.stringify({
            action: ServerMessageCode.start,
            data: board,
          } as ServerMsg<DynamicTableColors>)
        );

        timeIntervalRef = updateBoxesInterval(socket, board, boxIntervalConfig);

        break;
      }

      case ClientMessageCode.stop: {
        if (timeIntervalRef) {
          clearInterval(timeIntervalRef);
          board = null;
        }
        break;
      }

      case ClientMessageCode.pause: {
        if (timeIntervalRef) {
          clearInterval(timeIntervalRef);
        }
        break;
      }

      case ClientMessageCode.resume: {
        if (boxIntervalConfig) {
          timeIntervalRef = updateBoxesInterval(
            socket,
            board,
            boxIntervalConfig
          );
        }
      }

      case ClientMessageCode.generateRandomBoxChange: {
        console.log("here happens something: ");

        break;
      }

      default: {
        socket.send(JSON.stringify({ value: "does not work" }));
      }
    }
  });
};
