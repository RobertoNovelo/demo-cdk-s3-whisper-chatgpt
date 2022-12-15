import { useRecoilState } from "recoil";
import { MicIcon } from "@/components/Icons";
import { conversationState } from "@/store/app";

export function RecordButton() {
  const [conversation, setConversation] = useRecoilState(conversationState);
  return (
    <button className="rounded-full bg-red-700 text-white p-2">
      <MicIcon className="text-white h-12 w-12" />
    </button>
  );
}
