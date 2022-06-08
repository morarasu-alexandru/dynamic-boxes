import { v4 as uuidv4 } from "uuid";
import { DynamicTableColors, Row } from "../../../fe/src/types";

export const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

const defaultColor = `rgb(255, 255, 255)`;

export const generateColor = (): string => {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);

  const b = randomBetween(0, 255);
  return `rgb(${r},${g},${b})`;
};

export const generateTable = (
  row: number,
  columns: number
): DynamicTableColors => {
  let result: DynamicTableColors = [];

  for (let i = 0; i < row; i++) {
    result[i] = {
      id: uuidv4(),
      index: i,
      columns: [],
    };
    for (let j = 0; j < columns; j++) {
      (result[i] as Row).columns[j] = {
        id: uuidv4(),
        index: j,
        position: {
          row: i,
          column: j,
        },
        value: defaultColor,
      };
    }
  }

  return result;
};
