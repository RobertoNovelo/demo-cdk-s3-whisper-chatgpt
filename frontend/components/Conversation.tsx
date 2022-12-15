import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationState, conversationHistoryState } from "@/store/app";
import { SpinnerIcon } from "@/components/Icons";

export function Conversation() {
  const [conversation, setConversation] = useRecoilState(conversationState);
  const conversationHistory: any = useRecoilValue(conversationHistoryState);
  useEffect(() => {
    if (!conversationHistory[conversationHistory?.length - 1]?.answer) {
      // conversationHistory[conversationHistory?.length - 1]?.blob
    }
    // conversationHistory[conversationHistory?.length - 1]?.question
  }, [conversationHistory]);
  return (
    <div className="min-h-0 grow w-full overflow-y-auto flex justify-center items-center flex-col">
      {conversation === "IDLE" ? null : conversation === "RECORDING" ||
        conversation === "LOADING" ? (
        <SpinnerIcon className="h-16 w-16 animate-spin" />
      ) : conversation === "RESULT" ? (
        <p>{conversationHistory[conversationHistory?.length - 1]?.answer}</p>
      ) : null}
    </div>
  );
}
