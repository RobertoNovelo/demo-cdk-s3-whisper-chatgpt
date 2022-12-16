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
    <div className="min-h-0 grow w-full overflow-y-auto flex justify-center items-center flex-col px-4 text-center">
      {conversation === "IDLE" ||
      conversation === "RECORDING" ? null : conversation === "LOADING" ? (
        <SpinnerIcon className="h-16 w-16 animate-spin" />
      ) : conversation === "RESULT" ? (
        <>
          <p>
            You:{" "}
            {conversationHistory[conversationHistory?.length - 1]?.question}
          </p>
          <p>
            ChatGPT:{" "}
            {conversationHistory[conversationHistory?.length - 1]?.answer}
          </p>
        </>
      ) : null}
    </div>
  );
}
