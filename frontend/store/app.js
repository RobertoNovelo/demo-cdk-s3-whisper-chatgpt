import { atom } from "recoil";

export const conversationState = atom({
  key: "ConversationState",
  default: "IDLE",
});

export const conversationHistoryState = atom({
  key: "ConversationHistoryState",
  // {question:"Some question", answer:"Some Answer"}
  default: [],
});
