import { useRecoilState, useRecoilCallback } from "recoil";
import { MicIcon } from "@/components/Icons";
import { conversationState, conversationHistoryState } from "@/store/app";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

async function getChatGPTResponse(prompt = ""): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(prompt);
    }, 1000);
  });
}

export function RecordButton() {
  const [conversation, setConversation] = useRecoilState(conversationState);
  const [conversationHistory, setConversationHistory]: any = useRecoilState(
    conversationHistoryState
  );

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleClick = useRecoilCallback(({ snapshot }) => async () => {
    if (conversation === "IDLE" || conversation === "RESULT") {
      setConversation("RECORDING");

      SpeechRecognition.startListening();
      return;
    }
    if (conversation === "RECORDING") {
      SpeechRecognition.stopListening();
      console.log("STOP RECORDING", transcript);

      setConversation("LOADING");

      const answer = await getChatGPTResponse(transcript);

      window.speechSynthesis.speak(new SpeechSynthesisUtterance(answer));
      setConversationHistory([
        ...conversationHistory,
        {
          question: transcript,
          answer: answer,
        },
      ]);

      resetTranscript();
      setConversation("RESULT");
      return;
    }
  });

  return (
    <div>
      <p>{transcript}</p>
      <button
        onClick={handleClick}
        className="rounded-full bg-red-700 text-white p-2"
      >
        <MicIcon className="text-white h-12 w-12" />
      </button>
    </div>
  );
}
