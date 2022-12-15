import { useRecoilState, useRecoilCallback } from "recoil";
import { MicIcon } from "@/components/Icons";
import { conversationState, conversationHistoryState } from "@/store/app";

export function RecordButton() {
  const [conversation, setConversation] = useRecoilState(conversationState);
  const handleClick = () => {
    if (conversation === "IDLE" || conversation === "RESULT") {
      setConversation("RECORDING");
      return;
    }
    if (conversation === "RECORDING") {
      setConversation("RESULT");
      return;
    }
  };
  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-red-700 text-white p-2"
    >
      <MicIcon className="text-white h-12 w-12" />
    </button>
  );
}
