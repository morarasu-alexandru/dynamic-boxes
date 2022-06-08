import { DynamicTableColors, ServerMessageCode, ServerMsg } from "../../types";
import { store } from "../index";
import { updateBoxes } from "../slices/board";

export type Channel = "redux" | "general";

export interface Message {
  id: number;
  channel: Channel;
  userName: string;
  text: string;
}

export const listener = (serverRes: any): void => {
  const message: ServerMsg<DynamicTableColors> = JSON.parse(serverRes.data);
  console.log("message: ", message);

  switch (message.action) {
    case ServerMessageCode.generate:
    case ServerMessageCode.updateBoard:
    case ServerMessageCode.start:
      store.dispatch(updateBoxes(message.data));
      console.log("message: ", message.data);
  }
};
