import { useRecoilState, useRecoilCallback } from "recoil";
import { MicIcon } from "@/components/Icons";
import { conversationState, conversationHistoryState } from "@/store/app";
import { API } from "aws-amplify";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

async function getChatGPTResponse(prompt = ""): Promise<string> {
  try {
    const res = await API.post("random-api", "/chatgpt", {
      headers: {},
      response: true,
      body: {
        prompt,
      },
    });
    return res.data.choices[0].text;
  } catch (error) {
    return "ChatGPT can not answer your question";
  }
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
    <div className="max-w-full text-center flex-col flex justify-end items-center space-y-4 px-4">
      <p>{transcript}</p>
      <button
        disabled={conversation === "LOADING"}
        onClick={handleClick}
        className={`rounded-full bg-red-700 text-white p-2 h-16 w-16${
          conversation === "LOADING" ? " opacity-30 pointer-events-none" : ""
        }`}
      >
        {conversation === "RECORDING" ? (
          <div className="bg-white h-6 w-6 rounded-sm m-auto" />
        ) : (
          <MicIcon className="text-white h-12 w-12" />
        )}
      </button>
    </div>
  );
}
