import Head from "next/head";
import "@/lib/configureAmplify";
import { MicIcon, SpinnerIcon } from "@/components/Icons";
import { API } from "aws-amplify";

export default function Home() {
  function loadPublic() {
    return API.get("random-api", "/public", {
      headers: {},
      response: true,
      queryStringParameters: {
        someParam: "param",
      },
    });
  }
  return (
    <div className="container max-w-screen-lg mx-auto px-4">
      <Head>
        <title>For a hacking session</title>
        <meta name="description" content="Skeleton app for a demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-between py-16 h-screen space-y-6">
        <h1 className="text-3xl">Ask ChatGPT</h1>
        <div className="min-h-0 grow w-full overflow-y-auto flex justify-center items-center flex-col">
          <SpinnerIcon className="h-16 w-16 animate-spin" />
        </div>
        <button className="rounded-full bg-red-700 text-white p-2">
          <MicIcon className="text-white h-12 w-12" />
        </button>
      </main>
    </div>
  );
}
