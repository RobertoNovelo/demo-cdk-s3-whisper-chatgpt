import { useRecoilState, useRecoilCallback } from "recoil";
import { MicIcon } from "@/components/Icons";
import { conversationState, conversationHistoryState } from "@/store/app";
import { API } from "aws-amplify";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export function TestAudio() {
  const handleClick = () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Hello!"));
  };

  return (
    <button onClick={handleClick} className={`appearance-none`}>
      (Test audio)
    </button>
  );
}
