import { atom } from "recoil";

export const conversationState = atom({
  key: "ConversationState",
  default: "IDLE",
});
export const questionHistory = atom({
  key: "QuestionHistoryState",
  default: [],
});
