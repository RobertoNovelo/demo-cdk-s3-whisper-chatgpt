import { atom } from "recoil";

export const recordingState = atom({ key: "RecordingState", default: false });
export const questionHistory = atom({
  key: "QuestionHistoryState",
  default: [],
});
