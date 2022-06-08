export enum ClientMessageCode {
  "generate" = "generate",
  "start" = "start",
  "pause" = "pause",
  "resume" = "resume",
  "stop" = "stop",
  "generateRandomBoxChange" = "generateRandomBoxChange",
}

export enum ServerMessageCode {
  "generate" = "generate",
  "start" = "start",
  "updateBoard" = "updateBoard",
}

export interface ConfigBoard {
  rows?: number;
  columns?: number;
}

export interface StartConfig {
  intervalUpdate?: number;
  updateBoxCountMin?: number;
  updateBoxCountMax?: number;
}

export interface ClientMsg {
  action: ClientMessageCode;
  additional?: ConfigBoard | StartConfig;
}

export interface ServerMsg<T> {
  action: ServerMessageCode;
  data: T;
  message?: string;
}

export interface Row {
  id: string;
  index: number;
  columns: Column[];
}

export interface Postion {
  row: number;
  column: number;
}

export interface Column {
  id: string;
  index: number;
  position: Postion;
  value: string;
}

export interface BoxIntervalConfig {
  intervalUpdate: number;
  updateBoxCountMin: number;
  updateBoxCountMax: number;
}

export type DynamicTableColors = Row[];
