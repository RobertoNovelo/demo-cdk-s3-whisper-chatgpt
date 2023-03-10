import Head from "next/head";
import "@/lib/configureAmplify";
import { MicIcon, SpinnerIcon } from "@/components/Icons";
import { API } from "aws-amplify";
import { RecordButton } from "@/components/RecordButton";
import { Conversation } from "@/components/Conversation";
import { TestAudio } from "@/components/TestAudio";

import "regenerator-runtime/runtime";

export default function Home() {
  return (
    <div className="container max-w-screen-lg mx-auto px-4">
      <Head>
        <title>For a hacking session</title>
        <meta name="description" content="Skeleton app for a demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-between py-16 h-[90vh] space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl">Ask ChatGPT</h1>
          <TestAudio />
        </div>
        <Conversation />
        <RecordButton />
      </main>
    </div>
  );
}
