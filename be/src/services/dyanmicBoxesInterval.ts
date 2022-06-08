import { generateColor, randomBetween } from "./dynamicBoxesUtils";
import {
  BoxIntervalConfig,
  DynamicTableColors,
  Postion,
  ServerMessageCode,
  ServerMsg,
} from "../../../fe/src/types";

export const updateBoxesInterval = (
  socket: WebSocket,
  board: DynamicTableColors | null,
  boxIntervalConfig: BoxIntervalConfig
) => {
  return setInterval(() => {
    if (board) {
      // create a random selection of boxes (unique selections)
      const maxNumberOfBoxes = board.length * board[0].columns.length;
      const numberOfBoxesToUpdate = randomBetween(
        boxIntervalConfig.updateBoxCountMin,
        boxIntervalConfig.updateBoxCountMax
      );

      const boxesToUpdateCount =
        numberOfBoxesToUpdate > maxNumberOfBoxes
          ? maxNumberOfBoxes
          : numberOfBoxesToUpdate;
      const selections: Postion[] = [];
      console.log("numberOfBoxesToUpdate: ", numberOfBoxesToUpdate);
      // console.log("board: ", board);
      // console.log("row board: ", board[0]);
      // console.log("column board: ", board[0].columns[0]);

      for (let i = 0; i < boxesToUpdateCount; i++) {
        let randomRow = randomBetween(0, board.length - 1);
        let randomColumn = randomBetween(0, board[0].columns.length - 1);

        if (
          selections.some(
            (elem) => elem.row === randomRow && elem.column === randomColumn
          )
        ) {
          i--;
        } else {
          const possiblePosition: Postion = {
            row: randomRow,
            column: randomColumn,
          };
          selections.push(possiblePosition);
        }
      }

      // update all selections

      console.log("boxIntervalConfig: ", boxIntervalConfig);
      console.log("selections: ", selections);
      selections.forEach((selection) => {
        board[selection.row].columns[selection.column].value = generateColor();
      });
    }

    socket.send(
      JSON.stringify({
        action: ServerMessageCode.updateBoard,
        data: board,
      } as ServerMsg<DynamicTableColors>)
    );
  }, boxIntervalConfig.intervalUpdate);
};
